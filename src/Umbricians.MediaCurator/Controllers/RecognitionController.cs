using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.AI.Core.Chat;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;
using SixLabors.ImageSharp;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class RecognitionController : MediaCuratorApiControllerBase
{
    /// <summary>Most images one folder analysis will send to the AI.</summary>
    public const int MaxAnalyzeImages = 200;

    private const string PizzaTestImagePath = "tests/images/test-pizza.jpg";
    private const string OriginalPizzaTestAlias = "media-curator-pizza-original-test";
    private const string PreparedPizzaTestAlias = "media-curator-pizza-prepared-test";

    private readonly IRecognitionService _recognition;
    private readonly IMediaOperations _media;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IServiceProvider _services;
    private readonly IWebHostEnvironment _environment;
    private readonly IParallelMediaWork? _parallel;
    private readonly IClassificationSchemeLocator? _schemes;

    public RecognitionController(
        IRecognitionService recognition,
        IMediaOperations media,
        IMediaCuratorSettingsService settings,
        IServiceProvider services,
        IWebHostEnvironment environment,
        IParallelMediaWork? parallel = null,
        IClassificationSchemeLocator? schemes = null)
    {
        _parallel = parallel;
        _schemes = schemes;
        _recognition = recognition;
        _media = media;
        _settings = settings;
        _services = services;
        _environment = environment;
    }

    /// <summary>Runs a fresh AI vision pass on one or more images, ignoring cached descriptions.</summary>
    [HttpPost("recognition/reanalyze")]
    [ProducesResponseType<ReanalyzeImagesResponseModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ReanalyzeImages(ReanalyzeImagesRequestModel request, CancellationToken cancellationToken)
    {
        if (request.MediaKeys.Count == 0)
        {
            return BadRequest("Select at least one media item.");
        }

        var scheme = ResolveScheme(request.ClassificationSchemeAlias);

        var results = await ReanalyzeManyAsync(request.MediaKeys.Distinct().ToList(), scheme, cancellationToken);
        return Ok(new ReanalyzeImagesResponseModel { Results = results });
    }

    /// <summary>Re-runs AI recognition (ignoring cached results) for one image, or for every image
    /// under a folder and its subfolders.</summary>
    /// <summary>Analyzes the images under a media folder (recursively), or a single image.
    /// By default only images not analyzed yet are sent; <paramref name="all"/> re-does every one.
    /// Each image sent is analyzed from scratch, replacing its stored description and code.</summary>
    [HttpPost("recognition/media/{mediaKey:guid}/analyze")]
    [ProducesResponseType<AnalyzeMediaImagesResponseModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AnalyzeMediaImages(Guid mediaKey, [FromQuery] bool all, CancellationToken cancellationToken)
    {
        var images = CollectImages(mediaKey);
        if (images is null)
        {
            return NotFound(Error("Media item not found."));
        }

        var toAnalyze = all ? images : await NotAnalyzedAsync(images, cancellationToken);
        if (toAnalyze.Count > MaxAnalyzeImages)
        {
            return BadRequest(Error(
                $"This folder has {toAnalyze.Count} images to analyze; analyze at most {MaxAnalyzeImages} at a time."));
        }

        var scheme = ResolveScheme(null);
        var results = await ReanalyzeManyAsync(toAnalyze.Select(i => i.Key).ToList(), scheme, cancellationToken);

        return Ok(new AnalyzeMediaImagesResponseModel
        {
            Results = results,
            AlreadyAnalyzedCount = images.Count - toAnalyze.Count,
        });
    }

    /// <summary>The images an analyze run would send (all of them, or only those not analyzed yet),
    /// so the backoffice can analyze them one at a time and report progress.</summary>
    [HttpGet("recognition/media/{mediaKey:guid}/images")]
    [ProducesResponseType<MediaImagesToAnalyzeModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ListImagesToAnalyze(Guid mediaKey, [FromQuery] bool all, CancellationToken cancellationToken)
    {
        var images = CollectImages(mediaKey);
        if (images is null)
        {
            return NotFound(Error("Media item not found."));
        }

        var toAnalyze = all ? images : await NotAnalyzedAsync(images, cancellationToken);
        return Ok(new MediaImagesToAnalyzeModel
        {
            Images = toAnalyze.Select(i => new MediaImageModel { MediaKey = i.Key, MediaName = i.Name }).ToList(),
            AlreadyAnalyzedCount = images.Count - toAnalyze.Count,
        });
    }

    /// <summary>How many images are under a media folder, and how many are not analyzed yet.</summary>
    [HttpGet("recognition/media/{mediaKey:guid}/images/count")]
    [ProducesResponseType<MediaImageCountModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CountMediaImages(Guid mediaKey, CancellationToken cancellationToken)
    {
        var images = CollectImages(mediaKey);
        if (images is null)
        {
            return NotFound(Error("Media item not found."));
        }

        var notAnalyzed = await NotAnalyzedAsync(images, cancellationToken);
        return Ok(new MediaImageCountModel { Count = images.Count, NotAnalyzedCount = notAnalyzed.Count });
    }

    /// <summary>Images with no stored AI description. A classification code alone doesn't count:
    /// editors can enter codes by hand. When descriptions aren't stored, a code is all there is.</summary>
    private async Task<List<MediaItemInfo>> NotAnalyzedAsync(List<MediaItemInfo> images, CancellationToken cancellationToken)
    {
        var descriptionsStored = (await _settings.GetAsync(cancellationToken)).PersistImageDescription;
        var marker = descriptionsStored
            ? UmbracoAiRecognitionService.DescriptionPropertyAlias
            : ClassificationProvider.CodePropertyAlias;
        return images.Where(i => string.IsNullOrWhiteSpace(_media.GetPropertyValue(i.Key, marker))).ToList();
    }

    // The backoffice shows a problem's title in its error notification, so the reason goes there.
    // It only treats the body as problem details when "type" is present.
    private static ProblemDetails Error(string message) => new() { Title = message, Type = "Error" };

    /// <summary>An explicitly requested scheme, or null to use each image's ruleset (see
    /// <see cref="IClassificationSchemeLocator"/>).</summary>
    private static string? ResolveScheme(string? requested)
        => string.IsNullOrWhiteSpace(requested) ? null : requested.Trim();

    /// <summary>The images under a folder (recursively), or the item itself when it is an image.
    /// Null when the media item does not exist.</summary>
    private List<MediaItemInfo>? CollectImages(Guid mediaKey)
    {
        var clicked = _media.GetItem(mediaKey);
        if (clicked is null)
        {
            return null;
        }

        IEnumerable<MediaItemInfo> items = clicked.IsFolder ? _media.GetItems(mediaKey, recursive: true) : [clicked];
        return items
            .Where(i => !i.IsFolder
                && CurationEngine.ImageMediaTypes.Contains(i.ContentTypeAlias, StringComparer.OrdinalIgnoreCase))
            .ToList();
    }

    /// <summary>Analyzes the images concurrently (up to the configured number at a time); results keep
    /// the order of <paramref name="mediaKeys"/>.</summary>
    private async Task<List<ReanalyzeImageResultModel>> ReanalyzeManyAsync(
        IReadOnlyList<Guid> mediaKeys, string? scheme, CancellationToken cancellationToken)
    {
        if (_parallel is null || mediaKeys.Count <= 1)
        {
            var results = new List<ReanalyzeImageResultModel>(mediaKeys.Count);
            foreach (var mediaKey in mediaKeys)
            {
                cancellationToken.ThrowIfCancellationRequested();
                results.Add(await ReanalyzeOneAsync(_recognition, _media, _schemes, mediaKey, scheme, cancellationToken));
            }

            return results;
        }

        var parallelResults = await _parallel.RunAsync(
            mediaKeys,
            (services, mediaKey, ct) => ReanalyzeOneAsync(
                services.GetRequiredService<IRecognitionService>(),
                services.GetRequiredService<IMediaOperations>(),
                services.GetService<IClassificationSchemeLocator>(),
                mediaKey,
                scheme,
                ct),
            cancellationToken);
        return parallelResults.ToList();
    }

    /// <summary>Analyzes one image from scratch. Without an explicit <paramref name="scheme"/>, the image is
    /// classified with the scheme of the ruleset that curates it (none: description and tags only).</summary>
    private static async Task<ReanalyzeImageResultModel> ReanalyzeOneAsync(
        IRecognitionService recognition,
        IMediaOperations media,
        IClassificationSchemeLocator? schemes,
        Guid mediaKey,
        string? scheme,
        CancellationToken cancellationToken)
    {
        var item = media.GetItem(mediaKey);
        if (item is null)
        {
            return new ReanalyzeImageResultModel { MediaKey = mediaKey, Analyzed = false, Error = "Media item not found." };
        }

        if (item.IsFolder)
        {
            return new ReanalyzeImageResultModel
            {
                MediaKey = mediaKey,
                MediaName = item.Name,
                Analyzed = false,
                Error = "Folders cannot be analyzed. Choose image files.",
            };
        }

        try
        {
            scheme ??= schemes is null ? null : await schemes.GetSchemeForMediaAsync(mediaKey, cancellationToken);
            var result = await recognition.AnalyzeAsync(mediaKey, force: true, scheme, cancellationToken);
            if (result is null)
            {
                return new ReanalyzeImageResultModel
                {
                    MediaKey = mediaKey,
                    MediaName = item.Name,
                    Analyzed = false,
                    Error = "Recognition unavailable or the item has no readable image file.",
                };
            }

            return new ReanalyzeImageResultModel
            {
                MediaKey = mediaKey,
                MediaName = item.Name,
                Analyzed = true,
                Description = result.Description,
                Tags = result.Tags.Select(t => t.Name).ToList(),
                ClassificationCode = result.ClassificationCode,
            };
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            return new ReanalyzeImageResultModel
            {
                MediaKey = mediaKey,
                MediaName = item.Name,
                Analyzed = false,
                Error = ex.Message,
            };
        }
    }

    /// <summary>Runs the bundled pizza test image through Umbraco.AI without resizing.</summary>
    [HttpPost("recognition/test-pizza/original")]
    [ProducesResponseType<PizzaRecognitionTestResponseModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> TestPizzaOriginal(
        PizzaRecognitionTestRequestModel request,
        CancellationToken cancellationToken)
    {
        var imagePath = ResolveWorkspaceFile(PizzaTestImagePath);
        if (imagePath is null)
        {
            return NotFound($"Could not find '{PizzaTestImagePath}'.");
        }

        var imageBytes = await System.IO.File.ReadAllBytesAsync(imagePath, cancellationToken);
        return Ok(await RunPizzaRecognitionTestAsync(
            "original",
            OriginalPizzaTestAlias,
            imageBytes,
            "image/jpeg",
            request,
            cancellationToken));
    }

    /// <summary>Runs the bundled pizza test image through MediaCurator resize preparation before Umbraco.AI.</summary>
    [HttpPost("recognition/test-pizza/prepared")]
    [ProducesResponseType<PizzaRecognitionTestResponseModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> TestPizzaPrepared(
        PizzaRecognitionTestRequestModel request,
        CancellationToken cancellationToken)
    {
        var imagePath = ResolveWorkspaceFile(PizzaTestImagePath);
        if (imagePath is null)
        {
            return NotFound($"Could not find '{PizzaTestImagePath}'.");
        }

        var imageBytes = await System.IO.File.ReadAllBytesAsync(imagePath, cancellationToken);
        var settings = await _settings.GetAsync(cancellationToken);
        var maxEdgePixels = request.MaxEdgePixels ?? settings.RecognitionImageSize;
        var testOutputFolder = settings.SavePreparedImages
            ? RecognitionImagePreparer.ResolveTestOutputFolder(MediaCuratorDefaults.PreparedImagesFolder, _environment.ContentRootPath)
            : null;
        var (preparedBytes, preparedMediaType) = RecognitionImagePreparer.Prepare(
            imageBytes,
            "image/jpeg",
            maxEdgePixels,
            testOutputFolder,
            "test-pizza");

        return Ok(await RunPizzaRecognitionTestAsync(
            "prepared",
            PreparedPizzaTestAlias,
            preparedBytes,
            preparedMediaType,
            request,
            cancellationToken));
    }

    private async Task<PizzaRecognitionTestResponseModel> RunPizzaRecognitionTestAsync(
        string variant,
        string inlineChatAlias,
        byte[] imageBytes,
        string mediaType,
        PizzaRecognitionTestRequestModel request,
        CancellationToken cancellationToken)
    {
        var profiles = ResolveProfileAliases(request, (await _settings.GetAsync(cancellationToken)).DescriptionProfileAlias);
        var results = new List<PizzaRecognitionTestResultModel>(profiles.Count);
        var (width, height) = ReadDimensions(imageBytes);
        var chatService = _services.GetService<IAIChatService>();
        if (chatService is null)
        {
            results.Add(new PizzaRecognitionTestResultModel
            {
                Variant = variant,
                MediaType = mediaType,
                Width = width,
                Height = height,
                ByteLength = imageBytes.Length,
                Error = "Umbraco.AI chat service is not available.",
            });
            return new PizzaRecognitionTestResponseModel { Results = results };
        }

        foreach (var profileAlias in profiles)
        {
            try
            {
                var prompt = ClassificationPromptBuilder.BuildDescribePrompt();
                var message = new ChatMessage(ChatRole.User,
                [
                    new TextContent(prompt),
                    new DataContent(imageBytes, mediaType),
                ]);
                var response = await chatService.GetChatResponseAsync(
                    chat =>
                    {
                        chat.WithAlias(inlineChatAlias);
                        if (!string.IsNullOrWhiteSpace(profileAlias))
                        {
                            chat.WithProfile(profileAlias);
                        }
                    },
                    [message],
                    cancellationToken);
                var parsed = RecognitionResponseParser.Parse(response.Text);
                results.Add(new PizzaRecognitionTestResultModel
                {
                    Variant = variant,
                    ProfileAlias = profileAlias,
                    MediaType = mediaType,
                    Width = width,
                    Height = height,
                    ByteLength = imageBytes.Length,
                    RawResponse = response.Text,
                    Description = parsed?.Description,
                    Tags = parsed?.Tags.Select(t => t.Name).ToList() ?? [],
                });
            }
            catch (Exception ex)
            {
                results.Add(new PizzaRecognitionTestResultModel
                {
                    Variant = variant,
                    ProfileAlias = profileAlias,
                    MediaType = mediaType,
                    Width = width,
                    Height = height,
                    ByteLength = imageBytes.Length,
                    Error = ex.Message,
                });
            }
        }

        return new PizzaRecognitionTestResponseModel { Results = results };
    }

    private static List<string?> ResolveProfileAliases(PizzaRecognitionTestRequestModel request, string? configured)
    {
        var aliases = request.ProfileAliases
            .Where(alias => !string.IsNullOrWhiteSpace(alias))
            .Select(alias => alias.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Cast<string?>()
            .ToList();
        if (aliases.Count > 0)
        {
            return aliases;
        }

        return [string.IsNullOrWhiteSpace(configured) ? null : configured.Trim()];
    }

    private string? ResolveWorkspaceFile(string relativePath)
    {
        var directory = new DirectoryInfo(_environment.ContentRootPath);
        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, relativePath);
            if (System.IO.File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        return null;
    }

    private static (int Width, int Height) ReadDimensions(byte[] imageBytes)
    {
        try
        {
            var info = Image.Identify(imageBytes);
            return info is null ? (0, 0) : (info.Width, info.Height);
        }
        catch (UnknownImageFormatException)
        {
            return (0, 0);
        }
        catch (InvalidImageContentException)
        {
            return (0, 0);
        }
    }
}
