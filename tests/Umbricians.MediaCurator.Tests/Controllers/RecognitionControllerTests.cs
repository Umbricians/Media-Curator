using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Controllers;

public class RecognitionControllerTests
{
    private sealed class FakeMedia : IMediaOperations
    {
        public readonly Dictionary<Guid, MediaItemInfo> Items = [];
        public readonly Dictionary<Guid, List<Guid>> Children = [];
        public readonly Dictionary<(Guid, string), string> Values = [];

        public Guid Add(string name, string type, bool folder, Guid? parent = null)
        {
            var key = Guid.NewGuid();
            Items[key] = new MediaItemInfo(key, name, type, parent ?? Guid.Empty, DateTime.UtcNow, DateTime.UtcNow, folder);
            if (parent is { } p)
            {
                if (!Children.TryGetValue(p, out var list)) Children[p] = list = [];
                list.Add(key);
            }

            return key;
        }

        // Mirrors the real implementation: folders are descended into, never returned.
        public IReadOnlyList<MediaItemInfo> GetItems(Guid scopeFolderKey, bool recursive)
        {
            var result = new List<MediaItemInfo>();
            void Walk(Guid k)
            {
                foreach (var c in Children.GetValueOrDefault(k) ?? [])
                {
                    if (Items[c].IsFolder) { if (recursive) Walk(c); }
                    else result.Add(Items[c]);
                }
            }

            Walk(scopeFolderKey);
            return result;
        }

        public MediaItemInfo? GetItem(Guid mediaKey) => Items.GetValueOrDefault(mediaKey);
        public string? GetPropertyValue(Guid mediaKey, string propertyAlias) => Values.GetValueOrDefault((mediaKey, propertyAlias));
        public void SetPropertyValue(Guid mediaKey, string propertyAlias, string value) { }
        public Stream? OpenFile(Guid mediaKey) => null;
        public Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments) => parentFolderKey;
        public void Move(Guid mediaKey, Guid targetFolderKey) { }

        public IReadOnlyList<MediaItemInfo> GetChildren(Guid folderKey) => [];
        public void MoveToRecycleBin(Guid mediaKey) { }
        public void Delete(Guid mediaKey) { }
        public void RestoreFromRecycleBin(Guid mediaKey, Guid parentKey) { }

        public void SortChildren(Guid folderKey, IReadOnlyList<Guid> orderedChildKeys) { }
    }

    private sealed class FakeRecognition : IRecognitionService
    {
        public readonly List<(Guid Key, bool Force, string? Scheme)> Calls = [];
        public HashSet<Guid> Fail = [];

        public Task<RecognitionResult?> AnalyzeAsync(Guid mediaKey, bool force = false, string? classificationSchemeAlias = null, CancellationToken cancellationToken = default)
        {
            lock (Calls)
            {
                Calls.Add((mediaKey, force, classificationSchemeAlias));
            }

            if (Fail.Contains(mediaKey)) throw new InvalidOperationException("boom");
            return Task.FromResult<RecognitionResult?>(new RecognitionResult([new AiTag("cat", 0.9)], "A cat", "599"));
        }
    }

    /// <summary>Every image is curated by a ruleset classifying with <paramref name="scheme"/>, except
    /// those in <see cref="Unclassified"/>.</summary>
    private sealed class FakeSchemes(string? scheme) : Umbricians.MediaCurator.Rules.IClassificationSchemeLocator
    {
        public HashSet<Guid> Unclassified = [];

        public Task<string?> GetSchemeForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default)
            => Task.FromResult(Unclassified.Contains(mediaKey) ? null : scheme);
    }

    private sealed class FakeSettings(bool persistDescriptions, bool detectPeople = false) : IMediaCuratorSettingsService
    {
        public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult<string?>(null);

        public Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default) => Task.CompletedTask;

        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(new MediaCuratorSiteSettings { PersistImageDescription = persistDescriptions, DetectPeople = detectPeople });

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
            => Task.CompletedTask;
    }

    private static (RecognitionController Controller, FakeMedia Media, FakeRecognition Recognition) Create(bool persistDescriptions = true)
    {
        var media = new FakeMedia();
        var recognition = new FakeRecognition();
        var settings = new FakeSettings(persistDescriptions);
        return (new RecognitionController(recognition, media, settings, schemes: new FakeSchemes("dewey")), media, recognition);
    }

    private static void MarkAnalyzed(FakeMedia media, Guid image, string? description = "Stored", string? code = "500")
    {
        if (description is not null) media.Values[(image, UmbracoAiRecognitionService.DescriptionPropertyAlias)] = description;
        if (code is not null) media.Values[(image, "mediaCuratorClassificationCode")] = code;
    }

    private static AnalyzeMediaImagesResponseModel Ok(IActionResult result)
        => TestAssert.IsType<AnalyzeMediaImagesResponseModel>(TestAssert.IsType<OkObjectResult>(result).Value);

    private static (FakeMedia Media, Guid Root, Guid Image1, Guid Image2) Tree(FakeMedia media)
    {
        var root = media.Add("Root", "Folder", true);
        var sub = media.Add("Sub", "Folder", true, root);
        var i1 = media.Add("a.jpg", "Image", false, root);
        var i2 = media.Add("b.jpg", "Image", false, sub);
        media.Add("doc.pdf", "File", false, root);
        return (media, root, i1, i2);
    }

    [Test]
    public async Task Analyze_all_forces_every_image_in_subfolders_and_skips_non_images()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var model = TestAssert.IsType<AnalyzeMediaImagesResponseModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Results.Count, Is.EqualTo(2));
        foreach (var x in model.Results)
        {
            Assert.That(x.Analyzed, Is.True);
        }
        Assert.That(r.Calls.Select(x => x.Key).Order(), Is.EqualTo(new[] { i1, i2 }.Order()));
        foreach (var x in r.Calls)
        {
            Assert.That(x.Force, Is.True);
            Assert.That(x.Scheme, Is.EqualTo("dewey"));
        }
    }

    [Test]
    public async Task Single_image_is_analyzed_alone()
    {
        var (c, m, r) = Create();
        var (_, _, i1, _) = Tree(m);

        var result = await c.AnalyzeMediaImages(i1, all: true, CancellationToken.None);

        var model = TestAssert.IsType<AnalyzeMediaImagesResponseModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Results, Has.Exactly(1).Items);
        Assert.That(TestAssert.Single(r.Calls).Key, Is.EqualTo(i1));
    }

    [Test]
    public async Task Non_image_item_yields_no_results()
    {
        var (c, m, r) = Create();
        var pdf = m.Add("doc.pdf", "File", false);

        var result = await c.AnalyzeMediaImages(pdf, all: true, CancellationToken.None);

        Assert.That(TestAssert.IsType<AnalyzeMediaImagesResponseModel>(TestAssert.IsType<OkObjectResult>(result).Value).Results, Is.Empty);
        Assert.That(r.Calls, Is.Empty);
    }

    [Test]
    public async Task A_failing_image_is_reported_and_the_rest_continue()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        r.Fail.Add(i1);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var model = TestAssert.IsType<AnalyzeMediaImagesResponseModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Results.Single(x => x.MediaKey == i1).Error, Is.EqualTo("boom"));
        Assert.That(model.Results.Single(x => x.MediaKey == i2).Analyzed, Is.True);
    }

    [Test]
    public async Task Unknown_media_key_is_a_404_problem()
    {
        var (c, _, _) = Create();

        var reanalyze = await c.AnalyzeMediaImages(Guid.NewGuid(), all: true, CancellationToken.None);
        var count = await c.CountMediaImages(Guid.NewGuid(), CancellationToken.None);

        foreach (var r in new[] { reanalyze, count })
        {
            var problem = TestAssert.IsType<ProblemDetails>(TestAssert.IsType<NotFoundObjectResult>(r).Value);
            Assert.That(problem.Type, Is.EqualTo("Error"));
        }
    }

    [Test]
    public async Task Too_many_images_is_a_400_and_nothing_is_analyzed()
    {
        var (c, m, r) = Create();
        var root = m.Add("Big", "Folder", true);
        for (var i = 0; i < RecognitionController.MaxAnalyzeImages + 1; i++) m.Add($"{i}.jpg", "Image", false, root);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var problem = TestAssert.IsType<ProblemDetails>(TestAssert.IsType<BadRequestObjectResult>(result).Value);
        Assert.That(problem.Title, Is.EqualTo("This folder has 201 images to analyze; analyze at most 200 at a time."));
        Assert.That(r.Calls, Is.Empty);
    }

    [Test]
    public async Task Count_covers_subfolders_and_ignores_non_images()
    {
        var (c, m, _) = Create();
        var (_, root, i1, _) = Tree(m);

        Assert.That(TestAssert.IsType<MediaImageCountModel>(TestAssert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value).Count, Is.EqualTo(2));
        Assert.That(TestAssert.IsType<MediaImageCountModel>(TestAssert.IsType<OkObjectResult>(await c.CountMediaImages(i1, CancellationToken.None)).Value).Count, Is.EqualTo(1));
    }

    [Test]
    public async Task By_default_only_images_without_a_stored_description_are_analyzed()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);

        var model = Ok(await c.AnalyzeMediaImages(root, all: false, CancellationToken.None));

        Assert.That(TestAssert.Single(r.Calls).Key, Is.EqualTo(i2));
        Assert.That(r.Calls[0].Force, Is.True); // a not-yet-analyzed image is analyzed from scratch
        Assert.That(TestAssert.Single(model.Results).MediaKey, Is.EqualTo(i2));
        Assert.That(model.AlreadyAnalyzedCount, Is.EqualTo(1));
    }

    [Test]
    public async Task A_classification_code_without_a_description_does_not_count_as_analyzed()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1, description: null, code: "740");
        MarkAnalyzed(m, i2);

        await c.AnalyzeMediaImages(root, all: false, CancellationToken.None);

        Assert.That(TestAssert.Single(r.Calls).Key, Is.EqualTo(i1));
    }

    [Test]
    public async Task Analyze_all_includes_already_analyzed_images()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);

        var model = Ok(await c.AnalyzeMediaImages(root, all: true, CancellationToken.None));

        Assert.That(r.Calls.Count, Is.EqualTo(2));
        Assert.That(model.AlreadyAnalyzedCount, Is.EqualTo(0));
    }

    [Test]
    public async Task Without_stored_descriptions_a_classification_code_marks_an_image_analyzed()
    {
        var (c, m, r) = Create(persistDescriptions: false);
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1, description: null, code: "500");

        await c.AnalyzeMediaImages(root, all: false, CancellationToken.None);

        Assert.That(TestAssert.Single(r.Calls).Key, Is.EqualTo(i2));
    }

    [Test]
    public async Task Count_reports_images_not_yet_analyzed()
    {
        var (c, m, _) = Create();
        var (_, root, i1, _) = Tree(m);
        MarkAnalyzed(m, i1);

        var count = TestAssert.IsType<MediaImageCountModel>(TestAssert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.That(count.Count, Is.EqualTo(2));
        Assert.That(count.NotAnalyzedCount, Is.EqualTo(1));
    }

    [Test]
    public async Task The_image_limit_applies_only_to_images_being_analyzed()
    {
        var (c, m, r) = Create();
        var root = m.Add("Root", "Folder", true);
        for (var i = 0; i < RecognitionController.MaxAnalyzeImages + 5; i++)
        {
            var image = m.Add($"{i}.jpg", "Image", false, root);
            if (i > 0) MarkAnalyzed(m, image);
        }

        var model = Ok(await c.AnalyzeMediaImages(root, all: false, CancellationToken.None));

        Assert.That(r.Calls, Has.Exactly(1).Items);
        Assert.That(model.AlreadyAnalyzedCount, Is.EqualTo(RecognitionController.MaxAnalyzeImages + 4));
    }

    [Test]
    public async Task Listing_images_to_analyze_matches_what_a_folder_run_would_send()
    {
        var (c, m, _) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);

        var pending = TestAssert.IsType<MediaImagesToAnalyzeModel>(TestAssert.IsType<OkObjectResult>(await c.ListImagesToAnalyze(root, all: false, CancellationToken.None)).Value);
        var everything = TestAssert.IsType<MediaImagesToAnalyzeModel>(TestAssert.IsType<OkObjectResult>(await c.ListImagesToAnalyze(root, all: true, CancellationToken.None)).Value);

        Assert.That(TestAssert.Single(pending.Images).MediaKey, Is.EqualTo(i2));
        Assert.That(pending.Images[0].MediaName, Is.EqualTo("b.jpg"));
        Assert.That(pending.AlreadyAnalyzedCount, Is.EqualTo(1));
        Assert.That(everything.Images.Select(i => i.MediaKey).Order(), Is.EqualTo(new[] { i1, i2 }.Order()));
        Assert.That(everything.AlreadyAnalyzedCount, Is.EqualTo(0));
    }

    [Test]
    public async Task Listing_images_for_an_unknown_key_is_a_404()
    {
        var (c, _, _) = Create();

        Assert.That(await c.ListImagesToAnalyze(Guid.NewGuid(), all: false, CancellationToken.None), Is.TypeOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task Folder_analysis_runs_images_in_parallel_and_keeps_their_order()
    {
        var media = new FakeMedia();
        var recognition = new FakeRecognition();
        var root = media.Add("Root", "Folder", true);
        var images = Enumerable.Range(1, 6).Select(i => media.Add($"{i}.jpg", "Image", false, root)).ToList();
        recognition.Fail.Add(images[2]);
        var services = new Microsoft.Extensions.DependencyInjection.ServiceCollection();
        Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton<IRecognitionService>(services, recognition);
        Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton<IMediaOperations>(services, media);
        var schemes = new FakeSchemes("dewey");
        schemes.Unclassified.Add(images[0]);
        Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton<Umbricians.MediaCurator.Rules.IClassificationSchemeLocator>(services, schemes);
        var parallel = new TestParallelWork(3, Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider(services));
        var controller = new RecognitionController(
            recognition,
            media,
            new FakeSettings(true),
            parallel);

        var model = Ok(await controller.AnalyzeMediaImages(root, all: true, CancellationToken.None));

        Assert.That(parallel.Runs, Is.EqualTo(1));
        Assert.That(model.Results.Select(r => r.MediaKey), Is.EqualTo(images));
        Assert.That(model.Results[2].Analyzed, Is.False);
        Assert.That(model.Results[2].Error, Is.EqualTo("boom"));
        Assert.That(model.Results.Count(r => r.Analyzed), Is.EqualTo(5));
        // Each image is classified with its own ruleset's scheme; one outside any classification ruleset gets none.
        Assert.That(recognition.Calls.Single(c => c.Key == images[0]).Scheme, Is.Null);
        foreach (var c in recognition.Calls.Where(c => c.Key != images[0]))
        {
            Assert.That(c.Scheme, Is.EqualTo("dewey"));
        }
    }

    private sealed class FakePeople(Tests.People.FakePeopleRepository repository) : IPeopleDetectionService
    {
        public readonly List<(Guid Key, string? Description, bool Force)> Calls = [];

        public Task<PeopleDetection?> DetectAsync(
            Guid mediaKey, string? description, IReadOnlyList<AiTag> tags, bool force = false, CancellationToken cancellationToken = default)
        {
            lock (Calls)
            {
                Calls.Add((mediaKey, description, force));
            }

            var detection = new PeopleDetection(mediaKey, true, 0.9, PeopleDetectionSources.Jev, "-1,1", null, DateTime.UtcNow);
            repository.Rows[mediaKey] = detection;
            return Task.FromResult<PeopleDetection?>(detection);
        }
    }

    private static (RecognitionController Controller, FakeMedia Media, FakeRecognition Recognition, FakePeople People, Tests.People.FakePeopleRepository Repository)
        CreateWithPeople(bool detectPeople = true)
    {
        var media = new FakeMedia();
        var recognition = new FakeRecognition();
        var repository = new Tests.People.FakePeopleRepository();
        var people = new FakePeople(repository);
        var controller = new RecognitionController(
            recognition, media, new FakeSettings(true, detectPeople),
            schemes: new FakeSchemes("dewey"), people: people, peopleRepository: repository);
        return (controller, media, recognition, people, repository);
    }

    [Test]
    public async Task With_people_detection_on_analyzed_images_without_a_people_decision_count_as_not_analyzed()
    {
        var (c, m, _, _, repository) = CreateWithPeople();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);
        repository.Add(i2, "-1,1,2");

        var count = TestAssert.IsType<MediaImageCountModel>(TestAssert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.That(count.Count, Is.EqualTo(2));
        Assert.That(count.NotAnalyzedCount, Is.EqualTo(1));
    }

    [Test]
    public async Task With_people_detection_off_people_decisions_do_not_affect_the_count()
    {
        var (c, m, _, _, _) = CreateWithPeople(detectPeople: false);
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);

        var count = TestAssert.IsType<MediaImageCountModel>(TestAssert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.That(count.NotAnalyzedCount, Is.EqualTo(0));
    }

    [Test]
    public async Task Keeping_existing_analysis_decides_people_from_it_without_sending_the_image_again()
    {
        var (c, m, r, people, _) = CreateWithPeople();
        var (_, _, analyzed, fresh) = Tree(m);
        MarkAnalyzed(m, analyzed);

        var result = TestAssert.IsType<ReanalyzeImagesResponseModel>(TestAssert.IsType<OkObjectResult>(await c.ReanalyzeImages(
            new ReanalyzeImagesRequestModel { MediaKeys = [analyzed, fresh], KeepExistingAnalysis = true },
            CancellationToken.None)).Value);

        Assert.That(r.Calls.Single(x => x.Key == analyzed).Force, Is.False);
        Assert.That(r.Calls.Single(x => x.Key == fresh).Force, Is.True);
        var decided = TestAssert.Single(people.Calls);
        Assert.That(decided, Is.EqualTo((analyzed, "A cat", false)));
        Assert.That(result.Results.Single(x => x.MediaKey == analyzed).ContainsPeople, Is.True);
    }

    [Test]
    public async Task Re_analysis_reports_no_people_result_while_detection_is_off()
    {
        var (c, m, _, people, _) = CreateWithPeople(detectPeople: false);
        var (_, _, image, _) = Tree(m);

        var result = TestAssert.IsType<ReanalyzeImagesResponseModel>(TestAssert.IsType<OkObjectResult>(await c.ReanalyzeImages(
            new ReanalyzeImagesRequestModel { MediaKeys = [image] },
            CancellationToken.None)).Value);

        Assert.That(TestAssert.Single(result.Results).ContainsPeople, Is.Null);
        Assert.That(people.Calls, Is.Empty);
    }
}
