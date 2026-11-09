using System.Text.Json.Nodes;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Extensions;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Demo;

/// <summary>
/// Demo site only: seeds flat folders of generated images to benchmark curation at scale. Off unless
/// <c>MediaCuratorBenchmark:SeedCounts</c> is set (e.g. "1000,10000"), so run it against a throwaway
/// database. Each count gets a root folder "MC Bench {count}" with that many images directly inside and
/// a non-AI ruleset (date, orientation, format), so curation timings exclude AI calls. Idempotent: a
/// folder that already exists is topped up to its count.
/// </summary>
public sealed class BenchmarkSeederComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, BenchmarkSeeder>();
}

public sealed class BenchmarkSeeder : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
{
    private static readonly string[] Extensions = ["jpg", "jpg", "jpg", "png", "png", "gif", "webp"];
    private static readonly string[] Words =
    [
        "beach", "office", "team", "product", "banner", "logo", "harbour", "city", "mountain", "portrait",
        "event", "conference", "pizza", "garden", "street", "bridge", "forest", "kitchen", "launch", "summer",
    ];

    private readonly IConfiguration _configuration;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<BenchmarkSeeder> _logger;

    public BenchmarkSeeder(IConfiguration configuration, IServiceScopeFactory scopeFactory, ILogger<BenchmarkSeeder> logger)
    {
        _configuration = configuration;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    public Task HandleAsync(UmbracoApplicationStartedNotification notification, CancellationToken cancellationToken)
    {
        var counts = (_configuration["MediaCuratorBenchmark:SeedCounts"] ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(int.Parse)
            .ToList();
        if (counts.Count > 0)
        {
            // Off the startup path: seeding thousands of items takes minutes.
            _ = Task.Run(() => SeedAllAsync(counts));
        }

        return Task.CompletedTask;
    }

    private async Task SeedAllAsync(IReadOnlyList<int> counts)
    {
        try
        {
            foreach (var count in counts)
            {
                await SeedAsync(count);
            }

            _logger.LogInformation("MediaCurator benchmark: seeding complete.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "MediaCurator benchmark: seeding failed.");
        }
    }

    private async Task SeedAsync(int count)
    {
        using var scope = _scopeFactory.CreateScope();
        var services = scope.ServiceProvider;
        var mediaService = services.GetRequiredService<IMediaService>();
        var fileManager = services.GetRequiredService<MediaFileManager>();
        var urlGenerators = services.GetRequiredService<MediaUrlGeneratorCollection>();
        var shortStrings = services.GetRequiredService<IShortStringHelper>();
        var contentTypes = services.GetRequiredService<IContentTypeBaseServiceProvider>();
        var rulesets = services.GetRequiredService<IRulesetRepository>();

        var name = $"MC Bench {count}";
        var folder = mediaService.GetRootMedia().FirstOrDefault(m => m.Name == name);
        if (folder is null)
        {
            folder = mediaService.CreateMedia(name, Umbraco.Cms.Core.Constants.System.Root, Umbraco.Cms.Core.Constants.Conventions.MediaTypes.Folder);
            mediaService.Save(folder);
        }

        if (await rulesets.GetByScopeKeyAsync(folder.Key) is null)
        {
            await rulesets.SaveAsync(new Ruleset
            {
                ScopeRootKey = folder.Key,
                Name = $"Bench {count}",
                Rules =
                [
                    new RuleNode
                    {
                        ProviderAlias = DateFolderProvider.ProviderAlias,
                        Settings = new JsonObject { ["format"] = "yyyy/MM", ["source"] = "createDate" },
                        Children =
                        [
                            new RuleNode { ProviderAlias = DimensionsProvider.ProviderAlias },
                        ],
                    },
                    new RuleNode { ProviderAlias = ImageFormatProvider.ProviderAlias },
                ],
            });
        }

        var existing = (int)mediaService.CountChildren(folder.Id);
        var random = new Random(count);
        for (var i = existing; i < count; i++)
        {
            var extension = Extensions[random.Next(Extensions.Length)];
            var (width, height) = random.Next(3) switch
            {
                0 => (64, 40),
                1 => (40, 64),
                _ => (48, 48),
            };
            var fileName = $"{Words[random.Next(Words.Length)]}-{Words[random.Next(Words.Length)]}-{i:D5}.{extension}";

            using var stream = CreateImage(width, height, extension, random);
            var media = mediaService.CreateMedia(Path.GetFileNameWithoutExtension(fileName), folder, Umbraco.Cms.Core.Constants.Conventions.MediaTypes.Image);
            media.SetValue(fileManager, urlGenerators, shortStrings, contentTypes, Umbraco.Cms.Core.Constants.Conventions.Media.File, fileName, stream);
            mediaService.Save(media);

            if ((i + 1) % 500 == 0)
            {
                _logger.LogInformation("MediaCurator benchmark: {Name} {Done}/{Count}", name, i + 1, count);
            }
        }

        _logger.LogInformation("MediaCurator benchmark: {Name} ready ({Count} images, folder {Key}).", name, count, folder.Key);
    }

    internal static MemoryStream CreateImage(int width, int height, string extension, Random random)
    {
        using var image = new Image<Rgb24>(width, height, new Rgb24((byte)random.Next(256), (byte)random.Next(256), (byte)random.Next(256)));
        var stream = new MemoryStream();
        switch (extension)
        {
            case "png": image.SaveAsPng(stream); break;
            case "gif": image.SaveAsGif(stream); break;
            case "webp": image.SaveAsWebp(stream); break;
            default: image.SaveAsJpeg(stream); break;
        }

        stream.Position = 0;
        return stream;
    }
}
