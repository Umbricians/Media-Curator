using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
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
    private readonly IMediaCuratorSettingsService _settings;
    private readonly ILogger<UmbracoAiRecognitionService> _logger;
    private readonly IJevClassificationDecider? _jev;

    public UmbracoAiRecognitionService(
        IServiceProvider services,
        IMediaOperations media,
        ClassificationSchemeCollection schemes,
        RecognitionEnricherCollection enrichers,
        IMediaCuratorSettingsService settings,
        ILogger<UmbracoAiRecognitionService> logger,
        IJevClassificationDecider? jev = null)
    {
        _services = services;
        _media = media;
        _schemes = schemes;
        _enrichers = enrichers;
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

        var siteSettings = await _settings.GetAsync(cancellationToken);
        if (!siteSettings.AiEnabled)
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
        var ai = AiStepSettings.From(siteSettings);
        RecognitionResult? result;

        try
        {
            if (!force &&
                scheme is not null &&
                ai.Method != ClassificationMethod.SingleCall &&
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
        result = StampSourceUpdateDate(mediaKey, new RecognitionResult(
            context.Tags,
            context.Description,
            finalCode,
            ClassificationMethod: scheme is not null && finalCode is not null ? CurrentMethod(scheme, ai) : null));
        PersistAnalysis(mediaKey, result, siteSettings.PersistImageDescription, force);
        return result;
    }

    public async Task<RecognitionResult?> RefreshClassificationAsync(
        Guid mediaKey,
        string classificationSchemeAlias,
        CancellationToken cancellationToken = default)
    {
        var cached = ReadCached(mediaKey);
        var scheme = ResolveScheme(classificationSchemeAlias);
        var existing = _media.GetPropertyValue(mediaKey, ClassificationProvider.CodePropertyAlias)?.Trim();
        var siteSettings = await _settings.GetAsync(cancellationToken);
        var ai = AiStepSettings.From(siteSettings);
        if (scheme is null
            || string.IsNullOrEmpty(existing)
            || ai.Method == ClassificationMethod.SingleCall
            || !siteSettings.AiEnabled)
        {
            return cached;
        }

        var description = ReadPersistedDescription(mediaKey)?.Trim();
        if (string.IsNullOrEmpty(description))
        {
            description = cached?.Description?.Trim();
        }

        if (string.IsNullOrEmpty(description))
        {
            // Nothing to decide from without sending the image again.
            return cached;
        }

        if (cached is null)
        {
            // An AI description but no recognition cache: the code dates from before codes recorded how
            // they were chosen (or the cache property was added later). Treat it as an AI code decided the
            // old way. Saving the cache first also proves the property exists, so a site without it does
            // not pay for a decision on every run that it could never record.
            cached = StampSourceUpdateDate(mediaKey, new RecognitionResult([], description, existing));
            if (!Persist(mediaKey, cached))
            {
                return null;
            }
        }

        // Only a code the AI chose (the stored code still matches the AI's) is ours to change; a code an
        // editor entered or edited stays. Codes decided the current way stay too, whichever engine chose them.
        if (!string.Equals(existing, cached.ClassificationCode?.Trim(), StringComparison.OrdinalIgnoreCase)
            || string.Equals(cached.ClassificationMethod, CurrentMethod(scheme, ai), StringComparison.Ordinal))
        {
            return cached;
        }

        var chatService = _services.GetService<IAIChatService>();
        if (chatService is null)
        {
            return cached;
        }

        try
        {
            // Re-decide from the saved description and tags only: the image is never sent again.
            var code = ClassificationCodeValidator.Validate(
                scheme,
                await ClassifyFromDescriptionAsync(chatService, ai, scheme, description, cached.Tags, cancellationToken));
            if (code is null)
            {
                return cached;
            }

            var refreshed = cached with { ClassificationCode = code, ClassificationMethod = CurrentMethod(scheme, ai) };
            var changed = !string.Equals(code, existing, StringComparison.OrdinalIgnoreCase);
            var values = new Dictionary<string, string> { [TagsPropertyAlias] = JsonSerializer.Serialize(refreshed, _json) };
            if (changed)
            {
                values[ClassificationProvider.CodePropertyAlias] = code;
            }

            if (!TrySetPropertyValues(mediaKey, values).Contains(TagsPropertyAlias))
            {
                return cached;
            }

            if (changed)
            {
                _logger.LogInformation(
                    "MediaCurator: reclassified {MediaKey} from {OldCode} to {NewCode} ({Method}).",
                    mediaKey,
                    existing,
                    code,
                    refreshed.ClassificationMethod);
            }

            return refreshed;
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not refresh the classification of {MediaKey}; keeping its code.", mediaKey);
            return cached;
        }
    }

    private static string CurrentMethod(IClassificationScheme scheme, AiStepSettings ai)
        => HierarchicalClassificationResolver.MethodFor(
            scheme,
            ai.Method,
            MediaCuratorDefaults.MaxClassificationDepth,
            ai.OneStepLimit);

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
        var testOutputFolder = ai.SavePreparedImages
            ? RecognitionImagePreparer.ResolveTestOutputFolder(
                MediaCuratorDefaults.PreparedImagesFolder,
                _services.GetService<IWebHostEnvironment>()?.ContentRootPath)
            : null;
        (imageBytes, mediaType) = RecognitionImagePreparer.Prepare(
            imageBytes,
            mediaType,
            ai.ImageSize,
            testOutputFolder,
            mediaKey.ToString("N"));

        if (scheme is not null && ai.Method != ClassificationMethod.SingleCall)
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

        return await AnalyzeSingleShotAsync(chatService, ai, scheme, imageBytes, mediaType, cancellationToken);
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

        string? code;
        try
        {
            code = await ClassifyFromDescriptionAsync(
                chatService,
                ai,
                scheme,
                described.Description ?? string.Empty,
                described.Tags,
                cancellationToken);
        }
        catch (Exception) when (persistImageDescription)
        {
            // Keep the paid-for description so the next run classifies from it without vision. On
            // success it is saved with the rest of the analysis, in the same save.
            PersistDescription(mediaKey, described.Description);
            throw;
        }

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
            MediaCuratorDefaults.MaxClassificationDepth,
            cancellationToken,
            ai.OneStepLimit);

    /// <summary>One classification decision: Jev when chosen, otherwise (or when Jev has no API key or
    /// fails) the Umbraco.AI decision profile.</summary>
    private async Task<string?> DecideAsync(
        IAIChatService chatService,
        AiStepSettings ai,
        ClassificationChoice choice,
        CancellationToken cancellationToken)
    {
        if (ai.DecisionEngine == DecisionEngine.Jev)
        {
            var picked = _jev is null ? null : await _jev.ChooseAsync(choice, cancellationToken);
            if (picked is not null)
            {
                return picked;
            }

            _logger.LogDebug("MediaCurator: no Jev decision (no TypeSafe API key, or the call failed); using Umbraco.AI.");
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
        result = result with { SourceFile = CurrentSourceFile(mediaKey) };
        return updateDate is null ? result : result with { SourceUpdateDate = updateDate };
    }

    /// <summary>
    /// Whether the cached result still describes the item's file. It is tied to the file path, which
    /// Umbraco changes whenever the file is replaced, not to the item's update date: saving the cache,
    /// the description or the code, or moving the item, all bump that date, so a date check made every
    /// cache stale at once on a real site.
    /// </summary>
    private bool IsRecognitionFresh(Guid mediaKey, RecognitionResult? cached)
    {
        if (cached is null)
        {
            return false;
        }

        var source = CurrentSourceFile(mediaKey);
        if (cached.SourceFile is not null || source is not null)
        {
            return string.Equals(cached.SourceFile, source, StringComparison.OrdinalIgnoreCase);
        }

        if (cached.SourceUpdateDate is null)
        {
            // Legacy cache entries have no file version — treat as stale so vision re-runs.
            return false;
        }

        var item = _media.GetItem(mediaKey);
        return item is null || item.UpdateDate <= cached.SourceUpdateDate;
    }

    /// <summary>The media file's path ("src" of the umbracoFile value), or null when there is none.</summary>
    private string? CurrentSourceFile(Guid mediaKey)
    {
        var value = _media.GetPropertyValue(mediaKey, global::Umbraco.Cms.Core.Constants.Conventions.Media.File)?.Trim();
        if (string.IsNullOrEmpty(value))
        {
            return null;
        }

        if (!value.StartsWith('{'))
        {
            return value;
        }

        try
        {
            using var json = JsonDocument.Parse(value);
            return json.RootElement.TryGetProperty("src", out var src) && src.ValueKind == JsonValueKind.String
                ? src.GetString()
                : null;
        }
        catch (JsonException)
        {
            return null;
        }
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
            void Configure(Umbraco.AI.Core.InlineChat.AIChatBuilder chat)
            {
                chat.WithAlias(inlineChatAlias);
                if (!string.IsNullOrWhiteSpace(profileAlias))
                {
                    chat.WithProfile(profileAlias);
                }
            }

            if (requestedEffort is not { } value)
            {
                return (await chatService.GetChatResponseAsync(Configure, messages, cancellationToken)).Text;
            }

            // Umbraco.AI's GetChatResponseAsync rebuilds the chat options from the profile and drops
            // ChatOptions.Reasoning, so the effort never reached the model. A client from
            // CreateChatClientAsync passes the caller's options through (audit, profile and capability
            // settings still apply), so send the effort there, with the profile's own temperature and
            // token limit copied across. A reasoning effort set on the profile itself still wins.
            using var client = await chatService.CreateChatClientAsync(Configure, cancellationToken);
            var options = await ProfileChatOptionsAsync(profileAlias, cancellationToken);
            options.Reasoning = new ReasoningOptions { Effort = value };
            return (await client.GetResponseAsync(messages, options, cancellationToken)).Text;
        }
    }

    /// <summary>The options Umbraco.AI would have built from the profile (model, temperature, max tokens).</summary>
    private async Task<ChatOptions> ProfileChatOptionsAsync(string? profileAlias, CancellationToken cancellationToken)
    {
        var options = new ChatOptions();
        var profiles = _services.GetService<Umbraco.AI.Core.Profiles.IAIProfileService>();
        if (profiles is null)
        {
            return options;
        }

        try
        {
            var profile = !string.IsNullOrWhiteSpace(profileAlias)
                ? await profiles.GetProfileByAliasAsync(profileAlias, cancellationToken)
                : await profiles.HasDefaultProfileAsync(Umbraco.AI.Core.Models.AICapability.Chat, cancellationToken)
                    ? await profiles.GetDefaultProfileAsync(Umbraco.AI.Core.Models.AICapability.Chat, cancellationToken)
                    : null;
            if (profile is not null)
            {
                options.ModelId = profile.Model.ModelId;
                if (profile.Settings is Umbraco.AI.Core.Profiles.AIChatProfileSettings settings)
                {
                    options.Temperature = settings.Temperature;
                    options.MaxOutputTokens = settings.MaxTokens;
                }
            }
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogDebug(ex, "MediaCurator: could not read Umbraco.AI profile {Profile}; using model defaults.", profileAlias);
        }

        return options;
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
        AiReasoningEffort DecisionReasoning,
        ClassificationMethod Method,
        bool SavePreparedImages)
    {
        /// <summary>Final codes up to which a decision is made in one step (0: always level by level).</summary>
        public int OneStepLimit => Method == ClassificationMethod.OneStep ? MediaCuratorDefaults.OneStepClassificationLimit : 0;

        public static AiStepSettings From(MediaCuratorSiteSettings settings)
        {
            var descriptionProfile = Blank(settings.DescriptionProfileAlias);
            return new AiStepSettings(
                settings.RecognitionImageSize,
                descriptionProfile,
                settings.DescriptionReasoningEffort,
                settings.DecisionEngine,
                Blank(settings.DecisionProfileAlias) ?? descriptionProfile,
                settings.DecisionReasoningEffort,
                settings.ClassificationMethod,
                settings.SavePreparedImages);
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

    /// <summary>Caches the result on the item; false when it could not be saved.</summary>
    private bool Persist(Guid mediaKey, RecognitionResult result)
    {
        try
        {
            _media.SetPropertyValue(mediaKey, TagsPropertyAlias, JsonSerializer.Serialize(result, _json));
            return true;
        }
        catch (Exception ex)
        {
            // The cache property may not be provisioned (degraded mode): recognition then
            // re-runs per request instead of failing (§7 partial consent).
            _logger.LogDebug(ex, "MediaCurator: could not cache recognition result for {MediaKey}.", mediaKey);
            return false;
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

    /// <summary>
    /// Stores the analysis (cache, description and code) with a single save of the item. Each save
    /// raises a "media saved" notification, so separate saves used to start a "Media Saved" automation
    /// once per property.
    /// </summary>
    private void PersistAnalysis(Guid mediaKey, RecognitionResult result, bool persistDescription, bool force)
    {
        var values = new Dictionary<string, string>
        {
            [TagsPropertyAlias] = JsonSerializer.Serialize(result, _json),
        };

        if (persistDescription && !string.IsNullOrWhiteSpace(result.Description))
        {
            values[DescriptionPropertyAlias] = result.Description.Trim();
        }

        var code = result.ClassificationCode;
        if (!string.IsNullOrWhiteSpace(code)
            && (force || string.IsNullOrWhiteSpace(_media.GetPropertyValue(mediaKey, ClassificationProvider.CodePropertyAlias))))
        {
            values[ClassificationProvider.CodePropertyAlias] = code;
        }

        TrySetPropertyValues(mediaKey, values);
    }

    /// <summary>The aliases written (or already holding the value); empty when the save failed.</summary>
    private IReadOnlySet<string> TrySetPropertyValues(Guid mediaKey, IReadOnlyDictionary<string, string> values)
    {
        try
        {
            return _media.SetPropertyValues(mediaKey, values);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "MediaCurator: could not save the analysis of {MediaKey}.", mediaKey);
            return new HashSet<string>();
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
