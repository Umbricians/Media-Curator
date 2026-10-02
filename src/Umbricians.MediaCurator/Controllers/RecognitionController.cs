using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Umbraco.AI.Core.Chat;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Recognition;
using SixLabors.ImageSharp;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class RecognitionController : MediaCuratorApiControllerBase
{
    /// <summary>Most images one folder re-analysis will process (each is an AI request).</summary>
    public const int MaxReanalyzeImages = 200;

    private const string PizzaTestImagePath = "tests/images/test-pizza.jpg";
    private const string OriginalPizzaTestAlias = "media-curator-pizza-original-test";
    private const string PreparedPizzaTestAlias = "media-curator-pizza-prepared-test";

    private readonly IRecognitionService _recognition;
    private readonly IMediaOperations _media;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;
    private readonly IServiceProvider _services;
    private readonly IWebHostEnvironment _environment;

    public RecognitionController(
        IRecognitionService recognition,
        IMediaOperations media,
        IOptionsMonitor<MediaCuratorOptions> options,
        IServiceProvider services,
        IWebHostEnvironment environment)
    {
        _recognition = recognition;
        _media = media;
        _options = options;
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

        var results = new List<ReanalyzeImageResultModel>(request.MediaKeys.Count);
        foreach (var mediaKey in request.MediaKeys.Distinct())
        {
            results.Add(await ReanalyzeOneAsync(mediaKey, scheme, cancellationToken));
        }

        return Ok(new ReanalyzeImagesResponseModel { Results = results });
    }

    /// <summary>Re-runs AI recognition (ignoring cached results) for one image, or for every image
    /// under a folder and its subfolders.</summary>
    [HttpPost("recognition/media/{mediaKey:guid}/reanalyze")]
    [ProducesResponseType<ReanalyzeImagesResponseModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ReanalyzeMediaImages(Guid mediaKey, CancellationToken cancellationToken)
    {
        var images = CollectImages(mediaKey);
        if (images is null)
        {
            return NotFound(Error("Media item not found."));
        }

        if (images.Count > MaxReanalyzeImages)
        {
            return BadRequest(Error(
                $"This folder contains {images.Count} images; re-analyze at most {MaxReanalyzeImages} at a time."));
        }

        var scheme = ResolveScheme(null);
        var results = new List<ReanalyzeImageResultModel>(images.Count);
        foreach (var image in images)
        {
            cancellationToken.ThrowIfCancellationRequested();
            results.Add(await ReanalyzeOneAsync(image.Key, scheme, cancellationToken));
        }

        return Ok(new ReanalyzeImagesResponseModel { Results = results });
    }

    /// <summary>Counts the images a re-analysis of this media item would process.</summary>
    [HttpGet("recognition/media/{mediaKey:guid}/images/count")]
    [ProducesResponseType<MediaImageCountModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public IActionResult CountMediaImages(Guid mediaKey)
    {
        var images = CollectImages(mediaKey);
        return images is null
            ? NotFound(Error("Media item not found."))
            : Ok(new MediaImageCountModel { Count = images.Count });
    }

    // The backoffice shows a problem's title in its error notification, so the reason goes there.
    // It only treats the body as problem details when "type" is present.
    private static ProblemDetails Error(string message) => new() { Title = message, Type = "Error" };

    private string? ResolveScheme(string? requested)
    {
        var scheme = string.IsNullOrWhiteSpace(requested)
            ? _options.CurrentValue.ClassificationSchemeAlias
            : requested.Trim();
        return string.IsNullOrWhiteSpace(scheme) ? null : scheme;
    }

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

    private async Task<ReanalyzeImageResultModel> ReanalyzeOneAsync(
        Guid mediaKey, string? scheme, CancellationToken cancellationToken)
    {
        var item = _media.GetItem(mediaKey);
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
            var result = await _recognition.AnalyzeAsync(mediaKey, force: true, scheme, cancellationToken);
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
        var maxEdgePixels = request.MaxEdgePixels ?? _options.CurrentValue.MaxRecognitionEdgePixels;
        var testOutputFolder = RecognitionImagePreparer.ResolveTestOutputFolder(
            _options.CurrentValue.RecognitionPreparedImageTestFolder,
            _environment.ContentRootPath);
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
        var profiles = ResolveProfileAliases(request);
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

    private List<string?> ResolveProfileAliases(PizzaRecognitionTestRequestModel request)
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

        var configured = _options.CurrentValue.RecognitionProfileAlias?.Trim();
        return [string.IsNullOrWhiteSpace(configured) ? null : configured];
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
