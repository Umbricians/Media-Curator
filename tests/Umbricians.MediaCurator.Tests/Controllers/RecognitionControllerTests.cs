using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbricians.MediaCurator;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Recognition;

namespace Umbricians.MediaCurator.Tests.Controllers;

public class RecognitionControllerTests
{
    private sealed class FakeMedia : IMediaOperations
    {
        public readonly Dictionary<Guid, MediaItemInfo> Items = [];
        public readonly Dictionary<Guid, List<Guid>> Children = [];

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
        public string? GetPropertyValue(Guid mediaKey, string propertyAlias) => null;
        public void SetPropertyValue(Guid mediaKey, string propertyAlias, string value) { }
        public Stream? OpenFile(Guid mediaKey) => null;
        public Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments) => parentFolderKey;
        public void Move(Guid mediaKey, Guid targetFolderKey) { }
    }

    private sealed class FakeRecognition : IRecognitionService
    {
        public readonly List<(Guid Key, bool Force, string? Scheme)> Calls = [];
        public HashSet<Guid> Fail = [];

        public Task<RecognitionResult?> AnalyzeAsync(Guid mediaKey, bool force = false, string? classificationSchemeAlias = null, CancellationToken cancellationToken = default)
        {
            Calls.Add((mediaKey, force, classificationSchemeAlias));
            if (Fail.Contains(mediaKey)) throw new InvalidOperationException("boom");
            return Task.FromResult<RecognitionResult?>(new RecognitionResult([new AiTag("cat", 0.9)], "A cat", "599"));
        }
    }

    private sealed class StaticOptions(MediaCuratorOptions value) : IOptionsMonitor<MediaCuratorOptions>
    {
        public MediaCuratorOptions CurrentValue => value;
        public MediaCuratorOptions Get(string? name) => value;
        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
    }

    private static (RecognitionController Controller, FakeMedia Media, FakeRecognition Recognition) Create()
    {
        var media = new FakeMedia();
        var recognition = new FakeRecognition();
        var options = new StaticOptions(new MediaCuratorOptions { ClassificationSchemeAlias = "dewey" });
        return (new RecognitionController(recognition, media, options, null!, null!), media, recognition);
    }

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
    public async Task Folder_reanalyze_forces_every_image_in_subfolders_and_skips_non_images()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);

        var result = await c.ReanalyzeMediaImages(root, CancellationToken.None);

        var model = Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(2, model.Results.Count);
        Assert.All(model.Results, x => Assert.True(x.Analyzed));
        Assert.Equal(new[] { i1, i2 }.Order(), r.Calls.Select(x => x.Key).Order());
        Assert.All(r.Calls, x => { Assert.True(x.Force); Assert.Equal("dewey", x.Scheme); });
    }

    [Fact]
    public async Task Single_image_is_reanalyzed_alone()
    {
        var (c, m, r) = Create();
        var (_, _, i1, _) = Tree(m);

        var result = await c.ReanalyzeMediaImages(i1, CancellationToken.None);

        var model = Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Single(model.Results);
        Assert.Equal(i1, Assert.Single(r.Calls).Key);
    }

    [Fact]
    public async Task Non_image_item_yields_no_results()
    {
        var (c, m, r) = Create();
        var pdf = m.Add("doc.pdf", "File", false);

        var result = await c.ReanalyzeMediaImages(pdf, CancellationToken.None);

        Assert.Empty(Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value).Results);
        Assert.Empty(r.Calls);
    }

    [Fact]
    public async Task A_failing_image_is_reported_and_the_rest_continue()
    {
        var (c, m, r) = Create();
        var (_, root, i1, i2) = Tree(m);
        r.Fail.Add(i1);

        var result = await c.ReanalyzeMediaImages(root, CancellationToken.None);

        var model = Assert.IsType<ReanalyzeImagesResponseModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal("boom", model.Results.Single(x => x.MediaKey == i1).Error);
        Assert.True(model.Results.Single(x => x.MediaKey == i2).Analyzed);
    }

    [Fact]
    public async Task Unknown_media_key_is_a_404_problem()
    {
        var (c, _, _) = Create();

        var reanalyze = await c.ReanalyzeMediaImages(Guid.NewGuid(), CancellationToken.None);
        var count = c.CountMediaImages(Guid.NewGuid());

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
        for (var i = 0; i < RecognitionController.MaxReanalyzeImages + 1; i++) m.Add($"{i}.jpg", "Image", false, root);

        var result = await c.ReanalyzeMediaImages(root, CancellationToken.None);

        var problem = Assert.IsType<ProblemDetails>(Assert.IsType<BadRequestObjectResult>(result).Value);
        Assert.Equal("This folder contains 201 images; re-analyze at most 200 at a time.", problem.Title);
        Assert.Empty(r.Calls);
    }

    [Fact]
    public void Count_covers_subfolders_and_ignores_non_images()
    {
        var (c, m, _) = Create();
        var (_, root, i1, _) = Tree(m);

        Assert.Equal(2, Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(c.CountMediaImages(root)).Value).Count);
        Assert.Equal(1, Assert.IsType<MediaImageCountModel>(Assert.IsType<OkObjectResult>(c.CountMediaImages(i1)).Value).Count);
    }
}
