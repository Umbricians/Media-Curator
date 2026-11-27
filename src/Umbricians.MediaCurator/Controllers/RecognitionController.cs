using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
[BackOfficeRoute("umbriciansmediacurator/api/v{version:apiVersion}")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
internal class RecognitionController : MediaCuratorControllerBase
{
    /// <summary>Most images one folder analysis will send to the AI.</summary>
    public const int MaxAnalyzeImages = 200;

    private readonly IRecognitionService _recognition;
    private readonly IMediaOperations _media;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IParallelMediaWork? _parallel;
    private readonly IClassificationSchemeLocator? _schemes;
    private readonly IPeopleDetectionService? _people;
    private readonly IPeopleDetectionRepository? _peopleRepository;

    public RecognitionController(
        IRecognitionService recognition,
        IMediaOperations media,
        IMediaCuratorSettingsService settings,
        IParallelMediaWork? parallel = null,
        IClassificationSchemeLocator? schemes = null,
        IPeopleDetectionService? people = null,
        IPeopleDetectionRepository? peopleRepository = null)
    {
        _parallel = parallel;
        _schemes = schemes;
        _people = people;
        _peopleRepository = peopleRepository;
        _recognition = recognition;
        _media = media;
        _settings = settings;
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

        var results = await ReanalyzeManyAsync(
            request.MediaKeys.Distinct().ToList(),
            scheme,
            request.KeepExistingAnalysis,
            cancellationToken);
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
        var results = await ReanalyzeManyAsync(toAnalyze.Select(i => i.Key).ToList(), scheme, keepExisting: !all, cancellationToken);

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
    /// editors can enter codes by hand. When descriptions aren't stored, a code is all there is.
    /// With people detection on, analyzed images not yet checked for people count too; analyzing them
    /// keeps their stored analysis and decides from it.</summary>
    private async Task<List<MediaItemInfo>> NotAnalyzedAsync(List<MediaItemInfo> images, CancellationToken cancellationToken)
    {
        var settings = await _settings.GetAsync(cancellationToken);
        var marker = AnalysisMarker(settings);
        var missing = images.Where(i => string.IsNullOrWhiteSpace(_media.GetPropertyValue(i.Key, marker))).ToList();
        if (!settings.DetectPeople || !settings.AiEnabled || _peopleRepository is null)
        {
            return missing;
        }

        var decided = await _peopleRepository.GetManyAsync(images.Select(i => i.Key).ToList(), cancellationToken);
        var missingKeys = missing.Select(i => i.Key).ToHashSet();
        return images.Where(i => missingKeys.Contains(i.Key) || !decided.ContainsKey(i.Key)).ToList();
    }

    private static string AnalysisMarker(MediaCuratorSiteSettings settings)
        => settings.PersistImageDescription
            ? UmbracoAiRecognitionService.DescriptionPropertyAlias
            : ClassificationProvider.CodePropertyAlias;

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
        IReadOnlyList<Guid> mediaKeys, string? scheme, bool keepExisting, CancellationToken cancellationToken)
    {
        var settings = await _settings.GetAsync(cancellationToken);
        var options = new AnalyzeOptions(
            scheme,
            keepExisting ? AnalysisMarker(settings) : null,
            settings.DetectPeople && settings.AiEnabled);
        if (_parallel is null || mediaKeys.Count <= 1)
        {
            var results = new List<ReanalyzeImageResultModel>(mediaKeys.Count);
            foreach (var mediaKey in mediaKeys)
            {
                cancellationToken.ThrowIfCancellationRequested();
                results.Add(await ReanalyzeOneAsync(
                    _recognition, _media, _schemes, _people, _peopleRepository, mediaKey, options, cancellationToken));
            }

            return results;
        }

        var parallelResults = await _parallel.RunAsync(
            mediaKeys,
            (services, mediaKey, ct) => ReanalyzeOneAsync(
                services.GetRequiredService<IRecognitionService>(),
                services.GetRequiredService<IMediaOperations>(),
                services.GetService<IClassificationSchemeLocator>(),
                services.GetService<IPeopleDetectionService>(),
                services.GetService<IPeopleDetectionRepository>(),
                mediaKey,
                options,
                ct),
            cancellationToken);
        return parallelResults.ToList();
    }

    /// <param name="Scheme">An explicit classification scheme, or null for each image's ruleset scheme.</param>
    /// <param name="KeepExistingMarker">When set, images with a value in this property keep their stored
    /// analysis: only missing results are decided from it.</param>
    /// <param name="DetectPeople">Whether people detection is on.</param>
    private sealed record AnalyzeOptions(string? Scheme, string? KeepExistingMarker, bool DetectPeople);

    /// <summary>Analyzes one image from scratch (or, with <see cref="AnalyzeOptions.KeepExistingMarker"/>, fills in
    /// what an analyzed image is missing). Without an explicit scheme, the image is classified with the scheme
    /// of the ruleset that curates it (none: description and tags only).</summary>
    private static async Task<ReanalyzeImageResultModel> ReanalyzeOneAsync(
        IRecognitionService recognition,
        IMediaOperations media,
        IClassificationSchemeLocator? schemes,
        IPeopleDetectionService? people,
        IPeopleDetectionRepository? peopleRepository,
        Guid mediaKey,
        AnalyzeOptions options,
        CancellationToken cancellationToken)
    {
        var scheme = options.Scheme;
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
            var keep = options.KeepExistingMarker is { } marker
                && !string.IsNullOrWhiteSpace(media.GetPropertyValue(mediaKey, marker));
            var result = await recognition.AnalyzeAsync(mediaKey, force: !keep, scheme, cancellationToken);
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
                ContainsPeople = await ContainsPeopleAsync(people, peopleRepository, mediaKey, result, keep, options, cancellationToken),
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

    /// <summary>A fresh analysis already decided people (the recognition enricher); a kept analysis is decided
    /// now from its stored description, unless a current decision is stored.</summary>
    private static async Task<bool?> ContainsPeopleAsync(
        IPeopleDetectionService? people,
        IPeopleDetectionRepository? peopleRepository,
        Guid mediaKey,
        RecognitionResult result,
        bool kept,
        AnalyzeOptions options,
        CancellationToken cancellationToken)
    {
        if (!options.DetectPeople)
        {
            return null;
        }

        if (kept && people is not null)
        {
            return (await people.DetectAsync(mediaKey, result.Description, result.Tags, force: false, cancellationToken))
                ?.ContainsPeople;
        }

        return peopleRepository is null
            ? null
            : (await peopleRepository.GetManyAsync([mediaKey], cancellationToken)).GetValueOrDefault(mediaKey)?.ContainsPeople;
    }
}
