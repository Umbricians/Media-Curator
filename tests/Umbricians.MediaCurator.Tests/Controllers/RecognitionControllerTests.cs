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
        return (new RecognitionController(recognition, media, settings, null!, null!, schemes: new FakeSchemes("dewey")), media, recognition);
    }

    private static void MarkAnalyzed(FakeMedia media, Guid image, string? description = "Stored", string? code = "500")
    {
        if (description is not null) media.Values[(image, UmbracoAiRecognitionService.DescriptionPropertyAlias)] = description;
        if (code is not null) media.Values[(image, "mediaCuratorClassificationCode")] = code;
    }

    private static AnalyzeMediaImagesResponseModel Ok(IActionResult result)
        => Assert.IsType<AnalyzeMediaImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);

    private static (FakeMedia Media, Guid Root, Guid Image1, Guid Image2) Tree(FakeMedia media)
    {
        var root = media.Add("Root", "Folder", true);
        var sub = media.Add("Sub", "Folder", true, root);
        var i1 = media.Add("a.jpg", "Image", false, root);
        var i2 = media.Add("b.jpg", "Image", false, sub);
        media.Add("doc.pdf", "File", false, root);
        return (media, root, i1, i2);
    }

    [Fact]
    public async Task Analyze_all_forces_every_image_in_subfolders_and_skips_non_images()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var model = Assert.IsType<AnalyzeMediaImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(2, model.Results.Count);
        Assert.All(model.Results, x => Assert.True(x.Analyzed));
        Assert.Equal(new[] { i1, i2 }.Order(), r.Calls.Select(x => x.Key).Order());
        Assert.All(r.Calls, x => { Assert.True(x.Force); Assert.Equal("dewey", x.Scheme); });
    }

    [Fact]
    public async Task Single_image_is_analyzed_alone()
    {
        var (c, m, r) = Create();
        var (_, _, i1, _) = Tree(m);

        var result = await c.AnalyzeMediaImages(i1, all: true, CancellationToken.None);

        var model = Assert.IsType<AnalyzeMediaImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Single(model.Results);
        Assert.Equal(i1, Assert.Single(r.Calls).Key);
    }

    [Fact]
    public async Task Non_image_item_yields_no_results()
    {
        var (c, m, r) = Create();
        var pdf = m.Add("doc.pdf", "File", false);

        var result = await c.AnalyzeMediaImages(pdf, all: true, CancellationToken.None);

        Assert.Empty(Assert.IsType<AnalyzeMediaImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value).Results);
        Assert.Empty(r.Calls);
    }

    [Fact]
    public async Task A_failing_image_is_reported_and_the_rest_continue()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        r.Fail.Add(i1);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var model = Assert.IsType<AnalyzeMediaImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal("boom", model.Results.Single(x => x.MediaKey == i1).Error);
        Assert.True(model.Results.Single(x => x.MediaKey == i2).Analyzed);
    }

    [Fact]
    public async Task Unknown_media_key_is_a_404_problem()
    {
        var (c, _, _) = Create();

        var reanalyze = await c.AnalyzeMediaImages(Guid.NewGuid(), all: true, CancellationToken.None);
        var count = await c.CountMediaImages(Guid.NewGuid(), CancellationToken.None);

        foreach (var r in new[] { reanalyze, count })
        {
            var problem = Assert.IsType<ProblemDetails>(Assert.IsType<NotFoundObjectResult>(r).Value);
            Assert.Equal("Error", problem.Type);
        }
    }

    [Fact]
    public async Task Too_many_images_is_a_400_and_nothing_is_analyzed()
    {
        var (c, m, r) = Create();
        var root = m.Add("Big", "Folder", true);
        for (var i = 0; i < RecognitionController.MaxAnalyzeImages + 1; i++) m.Add($"{i}.jpg", "Image", false, root);

        var result = await c.AnalyzeMediaImages(root, all: true, CancellationToken.None);

        var problem = Assert.IsType<ProblemDetails>(Assert.IsType<BadRequestObjectResult>(result).Value);
        Assert.Equal("This folder has 201 images to analyze; analyze at most 200 at a time.", problem.Title);
        Assert.Empty(r.Calls);
    }

    [Fact]
    public async Task Count_covers_subfolders_and_ignores_non_images()
    {
        var (c, m, _) = Create();
        var (_, root, i1, _) = Tree(m);

        Assert.Equal(2, Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value).Count);
        Assert.Equal(1, Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(await c.CountMediaImages(i1, CancellationToken.None)).Value).Count);
    }

    [Fact]
    public async Task By_default_only_images_without_a_stored_description_are_analyzed()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);

        var model = Ok(await c.AnalyzeMediaImages(root, all: false, CancellationToken.None));

        Assert.Equal(i2, Assert.Single(r.Calls).Key);
        Assert.True(r.Calls[0].Force); // a not-yet-analyzed image is analyzed from scratch
        Assert.Equal(i2, Assert.Single(model.Results).MediaKey);
        Assert.Equal(1, model.AlreadyAnalyzedCount);
    }

    [Fact]
    public async Task A_classification_code_without_a_description_does_not_count_as_analyzed()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1, description: null, code: "740");
        MarkAnalyzed(m, i2);

        await c.AnalyzeMediaImages(root, all: false, CancellationToken.None);

        Assert.Equal(i1, Assert.Single(r.Calls).Key);
    }

    [Fact]
    public async Task Analyze_all_includes_already_analyzed_images()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);

        var model = Ok(await c.AnalyzeMediaImages(root, all: true, CancellationToken.None));

        Assert.Equal(2, r.Calls.Count);
        Assert.Equal(0, model.AlreadyAnalyzedCount);
    }

    [Fact]
    public async Task Without_stored_descriptions_a_classification_code_marks_an_image_analyzed()
    {
        var (c, m, r) = Create(persistDescriptions: false);
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1, description: null, code: "500");

        await c.AnalyzeMediaImages(root, all: false, CancellationToken.None);

        Assert.Equal(i2, Assert.Single(r.Calls).Key);
    }

    [Fact]
    public async Task Count_reports_images_not_yet_analyzed()
    {
        var (c, m, _) = Create();
        var (_, root, i1, _) = Tree(m);
        MarkAnalyzed(m, i1);

        var count = Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.Equal(2, count.Count);
        Assert.Equal(1, count.NotAnalyzedCount);
    }

    [Fact]
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

        Assert.Single(r.Calls);
        Assert.Equal(RecognitionController.MaxAnalyzeImages + 4, model.AlreadyAnalyzedCount);
    }

    [Fact]
    public async Task Listing_images_to_analyze_matches_what_a_folder_run_would_send()
    {
        var (c, m, _) = Create();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);

        var pending = Assert.IsType<MediaImagesToAnalyzeModel>(Assert.IsType<OkObjectResult>(
            await c.ListImagesToAnalyze(root, all: false, CancellationToken.None)).Value);
        var everything = Assert.IsType<MediaImagesToAnalyzeModel>(Assert.IsType<OkObjectResult>(
            await c.ListImagesToAnalyze(root, all: true, CancellationToken.None)).Value);

        Assert.Equal(i2, Assert.Single(pending.Images).MediaKey);
        Assert.Equal("b.jpg", pending.Images[0].MediaName);
        Assert.Equal(1, pending.AlreadyAnalyzedCount);
        Assert.Equal(new[] { i1, i2 }.Order(), everything.Images.Select(i => i.MediaKey).Order());
        Assert.Equal(0, everything.AlreadyAnalyzedCount);
    }

    [Fact]
    public async Task Listing_images_for_an_unknown_key_is_a_404()
    {
        var (c, _, _) = Create();

        Assert.IsType<NotFoundObjectResult>(await c.ListImagesToAnalyze(Guid.NewGuid(), all: false, CancellationToken.None));
    }

    [Fact]
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
            null!,
            null!,
            parallel);

        var model = Ok(await controller.AnalyzeMediaImages(root, all: true, CancellationToken.None));

        Assert.Equal(1, parallel.Runs);
        Assert.Equal(images, model.Results.Select(r => r.MediaKey));
        Assert.False(model.Results[2].Analyzed);
        Assert.Equal("boom", model.Results[2].Error);
        Assert.Equal(5, model.Results.Count(r => r.Analyzed));
        // Each image is classified with its own ruleset's scheme; one outside any classification ruleset gets none.
        Assert.Null(recognition.Calls.Single(c => c.Key == images[0]).Scheme);
        Assert.All(recognition.Calls.Where(c => c.Key != images[0]), c => Assert.Equal("dewey", c.Scheme));
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
            recognition, media, new FakeSettings(true, detectPeople), null!, null!,
            schemes: new FakeSchemes("dewey"), people: people, peopleRepository: repository);
        return (controller, media, recognition, people, repository);
    }

    [Fact]
    public async Task With_people_detection_on_analyzed_images_without_a_people_decision_count_as_not_analyzed()
    {
        var (c, m, _, _, repository) = CreateWithPeople();
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);
        repository.Add(i2, "-1,1,2");

        var count = Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(
            await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.Equal(2, count.Count);
        Assert.Equal(1, count.NotAnalyzedCount);
    }

    [Fact]
    public async Task With_people_detection_off_people_decisions_do_not_affect_the_count()
    {
        var (c, m, _, _, _) = CreateWithPeople(detectPeople: false);
        var (_, root, i1, i2) = Tree(m);
        MarkAnalyzed(m, i1);
        MarkAnalyzed(m, i2);

        var count = Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(
            await c.CountMediaImages(root, CancellationToken.None)).Value);

        Assert.Equal(0, count.NotAnalyzedCount);
    }

    [Fact]
    public async Task Keeping_existing_analysis_decides_people_from_it_without_sending_the_image_again()
    {
        var (c, m, r, people, _) = CreateWithPeople();
        var (_, _, analyzed, fresh) = Tree(m);
        MarkAnalyzed(m, analyzed);

        var result = Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(await c.ReanalyzeImages(
            new ReanalyzeImagesRequestModel { MediaKeys = [analyzed, fresh], KeepExistingAnalysis = true },
            CancellationToken.None)).Value);

        Assert.False(r.Calls.Single(x => x.Key == analyzed).Force);
        Assert.True(r.Calls.Single(x => x.Key == fresh).Force);
        var decided = Assert.Single(people.Calls);
        Assert.Equal((analyzed, "A cat", false), decided);
        Assert.True(result.Results.Single(x => x.MediaKey == analyzed).ContainsPeople);
    }

    [Fact]
    public async Task Re_analysis_reports_no_people_result_while_detection_is_off()
    {
        var (c, m, _, people, _) = CreateWithPeople(detectPeople: false);
        var (_, _, image, _) = Tree(m);

        var result = Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(await c.ReanalyzeImages(
            new ReanalyzeImagesRequestModel { MediaKeys = [image] },
            CancellationToken.None)).Value);

        Assert.Null(Assert.Single(result.Results).ContainsPeople);
        Assert.Empty(people.Calls);
    }
}
