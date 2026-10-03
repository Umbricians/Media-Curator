using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.AI.Core.Chat;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Schemes;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>
/// Image recognition on Umbraco.AI: sends the image to the configured chat profile
/// (vendor-agnostic, §8) and parses a strict-JSON tag/description response. Results are
/// cached on the media item; enrichers run before persisting.
/// </summary>
internal sealed class UmbracoAiRecognitionService : IRecognitionService
{
    public const string TagsPropertyAlias = "mediaCuratorTags";

    public const string DescriptionPropertyAlias = "mediaCuratorDescription";

    /// <summary>Inline chat alias required by Umbraco.AI for auditing and telemetry.</summary>
    private const string RecognitionChatAlias = "media-curator-recognition";

    private const string ClassificationRefineChatAlias = "media-curator-classification-refine";

    private static readonly JsonSerializerOptions _json = new() { PropertyNameCaseInsensitive = true };

    /// <summary>Profiles whose model rejected a reasoning effort; later calls skip it instead of failing twice.</summary>
    private static readonly ConcurrentDictionary<string, bool> _reasoningUnsupported = new(StringComparer.OrdinalIgnoreCase);

    private readonly IServiceProvider _services;
    private readonly IMediaOperations _media;
    private readonly ClassificationSchemeCollection _schemes;
    private readonly RecognitionEnricherCollection _enrichers;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly ILogger<UmbracoAiRecognitionService> _logger;
    private readonly IJevClassificationDecider? _jev;

    public UmbracoAiRecognitionService(
        IServiceProvider services,
        IMediaOperations media,
        ClassificationSchemeCollection schemes,
        RecognitionEnricherCollection enrichers,
        IOptionsMonitor<MediaCuratorOptions> options,
        IMediaCuratorSettingsService settings,
        ILogger<UmbracoAiRecognitionService> logger,
        IJevClassificationDecider? jev = null)
    {
        _services = services;
        _media = media;
        _schemes = schemes;
        _enrichers = enrichers;
        _options = options;
        _settings = settings;
        _logger = logger;
        _jev = jev;
    }

    public async Task<RecognitionResult?> AnalyzeAsync(
        Guid mediaKey,
        bool force = false,
        string? classificationSchemeAlias = null,
        CancellationToken cancellationToken = default)
    {
        var cached = !force ? ReadCached(mediaKey) : null;
        if (!force && cached is not null && !NeedsClassificationRun(mediaKey, cached, classificationSchemeAlias))
        {
            return cached;
        }

        if (_options.CurrentValue.MetadataOnly)
        {
            return null;
        }

        // Resolved lazily: the site may not have Umbraco.AI's runtime registered at all.
        var chatService = _services.GetService<IAIChatService>();
        if (chatService is null)
        {
            _logger.LogDebug("MediaCurator: Umbraco.AI chat service not available; recognition skipped.");
            return null;
        }

        var scheme = ResolveScheme(classificationSchemeAlias);
        var siteSettings = await _settings.GetAsync(cancellationToken);
        var ai = AiStepSettings.From(siteSettings, _options.CurrentValue);
        RecognitionResult? result;

        try
        {
            if (!force &&
                scheme is not null &&
                _options.CurrentValue.ClassificationMode == RecognitionClassificationMode.Hierarchical &&
                siteSettings.PersistImageDescription &&
                TryGetStoredRecognitionContext(mediaKey, cached, out var description, out var tags))
            {
                _logger.LogDebug(
                    "MediaCurator: reusing stored description for {MediaKey}; skipping vision.",
                    mediaKey);
                var code = await ClassifyFromDescriptionAsync(
                    chatService,
                    ai,
                    scheme,
                    description,
                    tags,
                    cancellationToken);
                result = new RecognitionResult(tags, description, code);
            }
            else
            {
                result = await AnalyzeWithVisionAsync(
                    chatService,
                    ai,
                    scheme,
                    mediaKey,
                    siteSettings.PersistImageDescription,
                    cancellationToken);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: recognition call failed for {MediaKey}.", mediaKey);
            return null;
        }

        if (result is null)
        {
            return null;
        }

        var validatedCode = ClassificationCodeValidator.Validate(scheme, result.ClassificationCode);

        // Enricher extension point (§8)
        var context = new RecognitionContext
        {
            MediaKey = mediaKey,
            Description = result.Description,
            ClassificationCode = validatedCode,
        };
        context.Tags.AddRange(result.Tags);
        foreach (var enricher in _enrichers)
        {
            await enricher.EnrichAsync(context, cancellationToken);
        }

        var finalCode = ClassificationCodeValidator.Validate(scheme, context.ClassificationCode);
        result = StampSourceUpdateDate(mediaKey, new RecognitionResult(context.Tags, context.Description, finalCode));
        Persist(mediaKey, result);
        if (siteSettings.PersistImageDescription)
        {
            PersistDescription(mediaKey, result.Description);
        }

        PersistClassificationCode(mediaKey, finalCode, force);
        return result;
    }

    private async Task<RecognitionResult?> AnalyzeWithVisionAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        IClassificationScheme? scheme,
        Guid mediaKey,
        bool persistImageDescription,
        CancellationToken cancellationToken)
    {
        byte[] imageBytes;
        try
        {
            using var stream = _media.OpenFile(mediaKey);
            if (stream is null)
            {
                return null;
            }

            using var buffer = new MemoryStream();
            await stream.CopyToAsync(buffer, cancellationToken);
            imageBytes = buffer.ToArray();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not read file for {MediaKey}.", mediaKey);
            return null;
        }

        var mediaType = GuessMediaType(mediaKey, imageBytes);
        var testOutputFolder = RecognitionImagePreparer.ResolveTestOutputFolder(
            _options.CurrentValue.RecognitionPreparedImageTestFolder,
            _services.GetService<IWebHostEnvironment>()?.ContentRootPath);
        (imageBytes, mediaType) = RecognitionImagePreparer.Prepare(
            imageBytes,
            mediaType,
            ai.ImageSize,
            testOutputFolder,
            mediaKey.ToString("N"));

        if (scheme is not null &&
            _options.CurrentValue.ClassificationMode == RecognitionClassificationMode.Hierarchical)
        {
            return await AnalyzeHierarchicalWithVisionAsync(
                chatService,
                ai,
                scheme,
                imageBytes,
                mediaType,
                persistImageDescription,
                mediaKey,
                cancellationToken);
        }

        var result = await AnalyzeSingleShotAsync(chatService, ai, scheme, imageBytes, mediaType, cancellationToken);
        if (result is not null && persistImageDescription)
        {
            PersistDescription(mediaKey, result.Description);
        }

        return result;
    }

    private async Task<RecognitionResult?> AnalyzeHierarchicalWithVisionAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        IClassificationScheme scheme,
        byte[] imageBytes,
        string mediaType,
        bool persistImageDescription,
        Guid mediaKey,
        CancellationToken cancellationToken)
    {
        var describePrompt = ClassificationPromptBuilder.BuildDescribePrompt();
        var describeMessage = new ChatMessage(ChatRole.User,
        [
            new TextContent(describePrompt),
            new DataContent(imageBytes, mediaType),
        ]);

        var describeResponse = await GetChatResponseAsync(
            chatService,
            RecognitionChatAlias,
            ai.DescriptionProfileAlias,
            ai.DescriptionReasoning,
            [describeMessage],
            cancellationToken);
        var described = RecognitionResponseParser.Parse(describeResponse);
        if (described is null)
        {
            return null;
        }

        if (persistImageDescription)
        {
            PersistDescription(mediaKey, described.Description);
        }

        var code = await ClassifyFromDescriptionAsync(
            chatService,
            ai,
            scheme,
            described.Description ?? string.Empty,
            described.Tags,
            cancellationToken);

        return new RecognitionResult(described.Tags, described.Description, code);
    }

    private async Task<string?> ClassifyFromDescriptionAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        CancellationToken cancellationToken)
        => await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            description,
            tags,
            (choice, ct) => DecideAsync(chatService, ai, choice, ct),
            _options.CurrentValue.MaxClassificationDepth,
            cancellationToken);

    /// <summary>One drill-down decision: Jev when chosen and configured, otherwise (or when Jev fails)
    /// the Umbraco.AI decision profile.</summary>
    private async Task<string?> DecideAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        ClassificationChoice choice,
        CancellationToken cancellationToken)
    {
        if (ai.DecisionEngine == DecisionEngine.Jev)
        {
            if (_jev is { IsConfigured: true })
            {
                var picked = await _jev.ChooseAsync(choice, cancellationToken);
                if (picked is not null)
                {
                    return picked;
                }
            }
            else
            {
                _logger.LogDebug("MediaCurator: Jev is selected but no TypeSafe API key is configured; using Umbraco.AI.");
            }
        }

        var responseText = await RefineClassificationAsync(
            chatService,
            ai,
            ClassificationPromptBuilder.BuildRefinePrompt(choice),
            cancellationToken);
        return RecognitionResponseParser.ParseClassificationCode(responseText);
    }

    private bool TryGetStoredRecognitionContext(
        Guid mediaKey,
        RecognitionResult? cached,
        out string description,
        out List<AiTag> tags)
    {
        if (!IsRecognitionFresh(mediaKey, cached))
        {
            description = string.Empty;
            tags = [];
            return false;
        }

        description = ReadPersistedDescription(mediaKey) ?? cached?.Description ?? string.Empty;
        tags = cached?.Tags.ToList() ?? [];
        return !string.IsNullOrWhiteSpace(description) && tags.Count > 0;
    }

    private RecognitionResult StampSourceUpdateDate(Guid mediaKey, RecognitionResult result)
    {
        var updateDate = _media.GetItem(mediaKey)?.UpdateDate;
        return updateDate is null ? result : result with { SourceUpdateDate = updateDate };
    }

    private bool IsRecognitionFresh(Guid mediaKey, RecognitionResult? cached)
    {
        if (cached?.SourceUpdateDate is null)
        {
            // Legacy cache entries have no file version — treat as stale so vision re-runs.
            return false;
        }

        var item = _media.GetItem(mediaKey);
        return item is null || item.UpdateDate <= cached.SourceUpdateDate;
    }

    private async Task<RecognitionResult?> AnalyzeSingleShotAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        IClassificationScheme? scheme,
        byte[] imageBytes,
        string mediaType,
        CancellationToken cancellationToken)
    {
        var prompt = scheme is null
            ? ClassificationPromptBuilder.BuildDescribePrompt()
            : ClassificationPromptBuilder.BuildSingleShotSchemePrompt(scheme);

        var message = new ChatMessage(ChatRole.User,
        [
            new TextContent(prompt),
            new DataContent(imageBytes, mediaType),
        ]);

        var responseText = await GetChatResponseAsync(
            chatService,
            RecognitionChatAlias,
            ai.DescriptionProfileAlias,
            ai.DescriptionReasoning,
            [message],
            cancellationToken);
        return RecognitionResponseParser.Parse(responseText);
    }

    private async Task<string?> RefineClassificationAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        string prompt,
        CancellationToken cancellationToken)
    {
        var message = new ChatMessage(ChatRole.User, [new TextContent(prompt)]);
        return await GetChatResponseAsync(
            chatService,
            ClassificationRefineChatAlias,
            ai.DecisionProfileAlias,
            ai.DecisionReasoning,
            [message],
            cancellationToken);
    }

    private async Task<string?> GetChatResponseAsync(
        IAIChatService chatService,
        string inlineChatAlias,
        string? profileAlias,
        AiReasoningEffort reasoning,
        IReadOnlyList<ChatMessage> messages,
        CancellationToken cancellationToken)
    {
        var profileKey = profileAlias ?? string.Empty;
        var effort = ToReasoningEffort(reasoning);
        if (effort is not null && _reasoningUnsupported.ContainsKey(profileKey))
        {
            effort = null;
        }

        try
        {
            return await SendAsync(effort);
        }
        catch (Exception ex) when (effort is not null
            && !cancellationToken.IsCancellationRequested
            && ex.ToString().Contains("reasoning", StringComparison.OrdinalIgnoreCase))
        {
            // Not every model takes a reasoning effort (e.g. gpt-4o rejects it). Retry once without it
            // and remember, so the setting degrades to "model default" instead of breaking recognition.
            _logger.LogInformation(
                ex,
                "MediaCurator: the AI call with reasoning effort {Effort} failed for profile {Profile}; retrying without it.",
                reasoning,
                string.IsNullOrEmpty(profileKey) ? "(default)" : profileKey);
            var text = await SendAsync(null);
            _reasoningUnsupported[profileKey] = true;
            return text;
        }

        async Task<string?> SendAsync(ReasoningEffort? requestedEffort)
        {
            var response = await chatService.GetChatResponseAsync(
                chat =>
                {
                    chat.WithAlias(inlineChatAlias);
                    if (!string.IsNullOrWhiteSpace(profileAlias))
                    {
                        chat.WithProfile(profileAlias);
                    }

                    if (requestedEffort is { } value)
                    {
                        // A reasoning effort set on the Umbraco.AI profile itself still wins.
                        chat.WithChatOptions(new ChatOptions { Reasoning = new ReasoningOptions { Effort = value } });
                    }
                },
                messages,
                cancellationToken);

            return response.Text;
        }
    }

    internal static ReasoningEffort? ToReasoningEffort(AiReasoningEffort effort) => effort switch
    {
        AiReasoningEffort.None => ReasoningEffort.None,
        AiReasoningEffort.Low => ReasoningEffort.Low,
        AiReasoningEffort.Medium => ReasoningEffort.Medium,
        AiReasoningEffort.High => ReasoningEffort.High,
        _ => null,
    };

    /// <summary>The resolved per-step AI settings for one analysis.</summary>
    internal sealed record AiStepSettings(
        int ImageSize,
        string? DescriptionProfileAlias,
        AiReasoningEffort DescriptionReasoning,
        DecisionEngine DecisionEngine,
        string? DecisionProfileAlias,
        AiReasoningEffort DecisionReasoning)
    {
        public static AiStepSettings From(MediaCuratorSiteSettings settings, MediaCuratorOptions options)
        {
            var descriptionProfile = Blank(settings.DescriptionProfileAlias) ?? Blank(options.RecognitionProfileAlias);
            return new AiStepSettings(
                settings.RecognitionImageSize,
                descriptionProfile,
                settings.DescriptionReasoningEffort,
                settings.DecisionEngine,
                Blank(settings.DecisionProfileAlias) ?? Blank(options.DecisionProfileAlias) ?? descriptionProfile,
                settings.DecisionReasoningEffort);
        }

        private static string? Blank(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private bool NeedsClassificationRun(Guid mediaKey, RecognitionResult cached, string? classificationSchemeAlias)
    {
        if (string.IsNullOrWhiteSpace(classificationSchemeAlias))
        {
            return false;
        }

        if (!string.IsNullOrWhiteSpace(cached.ClassificationCode))
        {
            return false;
        }

        var existing = _media.GetPropertyValue(mediaKey, ClassificationProvider.CodePropertyAlias);
        return string.IsNullOrWhiteSpace(existing);
    }

    private IClassificationScheme? ResolveScheme(string? classificationSchemeAlias)
    {
        if (string.IsNullOrWhiteSpace(classificationSchemeAlias))
        {
            return null;
        }

        return _schemes.GetByAlias(classificationSchemeAlias);
    }

    private RecognitionResult? ReadCached(Guid mediaKey)
    {
        var json = _media.GetPropertyValue(mediaKey, TagsPropertyAlias);
        if (string.IsNullOrWhiteSpace(json))
        {
            return null;
        }

        try
        {
            var cached = JsonSerializer.Deserialize<RecognitionResult>(json, _json);
            return IsRecognitionFresh(mediaKey, cached) ? cached : null;
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private void Persist(Guid mediaKey, RecognitionResult result)
    {
        try
        {
            _media.SetPropertyValue(mediaKey, TagsPropertyAlias, JsonSerializer.Serialize(result, _json));
        }
        catch (Exception ex)
        {
            // The cache property may not be provisioned (degraded mode): recognition then
            // re-runs per request instead of failing (§7 partial consent).
            _logger.LogDebug(ex, "MediaCurator: could not cache recognition result for {MediaKey}.", mediaKey);
        }
    }

    private string? ReadPersistedDescription(Guid mediaKey)
        => _media.GetPropertyValue(mediaKey, DescriptionPropertyAlias);

    private void PersistDescription(Guid mediaKey, string? description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            return;
        }

        try
        {
            _media.SetPropertyValue(mediaKey, DescriptionPropertyAlias, description.Trim());
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "MediaCurator: could not persist image description for {MediaKey}.", mediaKey);
        }
    }

    private void PersistClassificationCode(Guid mediaKey, string? code, bool force)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            return;
        }

        if (!force)
        {
            var existing = _media.GetPropertyValue(mediaKey, ClassificationProvider.CodePropertyAlias);
            if (!string.IsNullOrWhiteSpace(existing))
            {
                return;
            }
        }

        try
        {
            _media.SetPropertyValue(mediaKey, ClassificationProvider.CodePropertyAlias, code);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "MediaCurator: could not persist classification code for {MediaKey}.", mediaKey);
        }
    }

    internal static RecognitionResult? Parse(string? text)
        => RecognitionResponseParser.Parse(text);

    private string GuessMediaType(Guid mediaKey, byte[] imageBytes)
    {
        var mediaTypeFromBytes = GuessMediaTypeFromBytes(imageBytes);
        if (mediaTypeFromBytes is not null)
        {
            return mediaTypeFromBytes;
        }

        var name = _media.GetItem(mediaKey)?.Name ?? string.Empty;
        return Path.GetExtension(name).ToLowerInvariant() switch
        {
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".webp" => "image/webp",
            _ => "image/jpeg",
        };
    }

    private static string? GuessMediaTypeFromBytes(byte[] imageBytes)
    {
        if (imageBytes.Length >= 3 &&
            imageBytes[0] == 0xFF &&
            imageBytes[1] == 0xD8 &&
            imageBytes[2] == 0xFF)
        {
            return "image/jpeg";
        }

        if (imageBytes.Length >= 8 &&
            imageBytes[0] == 0x89 &&
            imageBytes[1] == 0x50 &&
            imageBytes[2] == 0x4E &&
            imageBytes[3] == 0x47 &&
            imageBytes[4] == 0x0D &&
            imageBytes[5] == 0x0A &&
            imageBytes[6] == 0x1A &&
            imageBytes[7] == 0x0A)
        {
            return "image/png";
        }

        if (imageBytes.Length >= 6 &&
            imageBytes[0] == 0x47 &&
            imageBytes[1] == 0x49 &&
            imageBytes[2] == 0x46 &&
            imageBytes[3] == 0x38 &&
            (imageBytes[4] == 0x37 || imageBytes[4] == 0x39) &&
            imageBytes[5] == 0x61)
        {
            return "image/gif";
        }

        if (imageBytes.Length >= 12 &&
            imageBytes[0] == 0x52 &&
            imageBytes[1] == 0x49 &&
            imageBytes[2] == 0x46 &&
            imageBytes[3] == 0x46 &&
            imageBytes[8] == 0x57 &&
            imageBytes[9] == 0x45 &&
            imageBytes[10] == 0x42 &&
            imageBytes[11] == 0x50)
        {
            return "image/webp";
        }

        return null;
    }
}
