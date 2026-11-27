using System.Text.Json.Nodes;
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

public sealed class DemoContentSeederComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, DemoContentSeeder>();
}

/// <summary>
/// Gives a fresh demo site something to curate: a "Sample Images" media folder and a ruleset that needs no AI.
/// Only runs when <c>MediaCuratorDemo:SeedSampleContent</c> is true, and leaves the site alone once the folder exists.
/// </summary>
public sealed class DemoContentSeeder : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
{
    private const string FolderName = "Sample Images";
    private const int GeneratedImageCount = 18;

    private static readonly string[] Extensions = ["jpg", "png", "webp"];
    private static readonly string[] Subjects = ["harbour", "city", "team", "garden", "bridge", "launch"];

    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<DemoContentSeeder> _logger;

    public DemoContentSeeder(
        IConfiguration configuration,
        IWebHostEnvironment environment,
        IServiceScopeFactory scopeFactory,
        ILogger<DemoContentSeeder> logger)
    {
        _configuration = configuration;
        _environment = environment;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    public async Task HandleAsync(UmbracoApplicationStartedNotification notification, CancellationToken cancellationToken)
    {
        if (!_configuration.GetValue<bool>("MediaCuratorDemo:SeedSampleContent"))
        {
            return;
        }

        try
        {
            await SeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Media Curator demo: could not add the sample content.");
        }
    }

    private async Task SeedAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var services = scope.ServiceProvider;
        var mediaService = services.GetRequiredService<IMediaService>();
        if (mediaService.GetRootMedia().Any(m => m.Name == FolderName))
        {
            return;
        }

        var folder = mediaService.CreateMedia(FolderName, Umbraco.Cms.Core.Constants.System.Root, Umbraco.Cms.Core.Constants.Conventions.MediaTypes.Folder);
        mediaService.Save(folder);

        void AddImage(string fileName, Stream stream)
        {
            var media = mediaService.CreateMedia(Path.GetFileNameWithoutExtension(fileName), folder, Umbraco.Cms.Core.Constants.Conventions.MediaTypes.Image);
            media.SetValue(
                services.GetRequiredService<MediaFileManager>(),
                services.GetRequiredService<MediaUrlGeneratorCollection>(),
                services.GetRequiredService<IShortStringHelper>(),
                services.GetRequiredService<IContentTypeBaseServiceProvider>(),
                Umbraco.Cms.Core.Constants.Conventions.Media.File,
                fileName,
                stream);
            mediaService.Save(media);
        }

        foreach (var path in FindRepositoryImages())
        {
            using var stream = System.IO.File.OpenRead(path);
            AddImage(Path.GetFileName(path), stream);
        }

        var random = new Random(GeneratedImageCount);
        for (var i = 0; i < GeneratedImageCount; i++)
        {
            var extension = Extensions[i % Extensions.Length];
            var (width, height) = (i % 3) switch
            {
                0 => (640, 400),
                1 => (400, 640),
                _ => (480, 480),
            };

            using var stream = BenchmarkSeeder.CreateImage(width, height, extension, random);
            AddImage($"{Subjects[i % Subjects.Length]}-{i + 1:D2}.{extension}", stream);
        }

        await services.GetRequiredService<IRulesetRepository>().SaveAsync(new Ruleset
        {
            ScopeRootKey = folder.Key,
            Name = FolderName,
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

        _logger.LogInformation("Media Curator demo: added the \"{Folder}\" media folder and ruleset.", FolderName);
    }

    /// <summary>The photographs kept in the repository, when the demo runs from a checkout.</summary>
    private IEnumerable<string> FindRepositoryImages()
    {
        for (var directory = new DirectoryInfo(_environment.ContentRootPath); directory is not null; directory = directory.Parent)
        {
            var images = Path.Combine(directory.FullName, "tests", "images");
            if (Directory.Exists(images))
            {
                return Directory.EnumerateFiles(images, "*.jpg");
            }
        }

        return [];
    }
}
