using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbricians.MediaCurator.Configuration;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Settings;

internal sealed class MediaCuratorSettingsService : IMediaCuratorSettingsService
{
    // Recognition reads settings once per image; a short cache keeps that off the database.
    private static readonly TimeSpan CacheDuration = TimeSpan.FromSeconds(30);

    private static readonly JsonSerializerOptions _json = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() },
    };

    private readonly IMediaCuratorSettingsRepository _repository;
    private readonly IDataProtector _protector;
    private readonly IOptionsMonitor<MediaCuratorOptions>? _options;
    private readonly ILogger<MediaCuratorSettingsService>? _logger;
    private readonly TimeProvider _time;
    private (MediaCuratorSiteSettings Settings, string? ApiKey, DateTimeOffset Expires)? _cached;

    public MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IDataProtectionProvider dataProtection,
        IOptionsMonitor<MediaCuratorOptions> options,
        ILogger<MediaCuratorSettingsService> logger)
        : this(repository, dataProtection, options, logger, TimeProvider.System)
    {
    }

    internal MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IDataProtectionProvider dataProtection,
        IOptionsMonitor<MediaCuratorOptions>? options,
        ILogger<MediaCuratorSettingsService>? logger,
        TimeProvider time)
    {
        _repository = repository;
        _protector = dataProtection.CreateProtector("Umbricians.MediaCurator.TypeSafeApiKey");
        _options = options;
        _logger = logger;
        _time = time;
    }

    public async Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
    {
        var (settings, savedKey) = await LoadAsync(cancellationToken);
        var copy = Copy(settings);
        (copy.JevApiKeySource, copy.JevApiKeyConfigured) = ServerApiKey() is not null
            ? (ApiKeySource.ServerConfiguration, true)
            : savedKey is not null ? (ApiKeySource.Backoffice, true) : (ApiKeySource.None, false);
        return copy;
    }

    public async Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default)
        => ServerApiKey() ?? (await LoadAsync(cancellationToken)).ApiKey;

    /// <summary>Read on every call, so a key rotated in configuration (or Key Vault, with reload) applies at once.</summary>
    private string? ServerApiKey()
        => _options?.CurrentValue.Secrets.TypeSafeApiKey is { } key && !string.IsNullOrWhiteSpace(key)
            ? key.Trim()
            : null;

    public async Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
    {
        var stored = await _repository.GetAsync(cancellationToken);
        var ai = Deserialize(stored?.AiSettings) ?? new StoredAiSettings();
        ai.AiEnabled = settings.AiEnabled;
        ai.RecognitionImageSize = Math.Max(0, settings.RecognitionImageSize);
        ai.DescriptionProfileAlias = Blank(settings.DescriptionProfileAlias);
        ai.DescriptionReasoningEffort = settings.DescriptionReasoningEffort;
        ai.ClassificationMethod = settings.ClassificationMethod;
        ai.DecisionEngine = settings.DecisionEngine;
        ai.DecisionProfileAlias = Blank(settings.DecisionProfileAlias);
        ai.DecisionReasoningEffort = settings.DecisionReasoningEffort;
        ai.JevModel = Blank(settings.JevModel);
        ai.MaxParallelAnalyses = ClampParallel(settings.MaxParallelAnalyses);
        ai.SavePreparedImages = settings.SavePreparedImages;
        ai.DetectPeople = settings.DetectPeople;
        await WriteAsync(settings.PersistImageDescription, ai, cancellationToken);
    }

    public async Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default)
    {
        var stored = await _repository.GetAsync(cancellationToken);
        var ai = Deserialize(stored?.AiSettings) ?? new StoredAiSettings();
        ai.TypeSafeApiKey = string.IsNullOrWhiteSpace(apiKey) ? null : _protector.Protect(apiKey.Trim());
        await WriteAsync(stored?.PersistImageDescription ?? true, ai, cancellationToken);
    }

    private async Task WriteAsync(bool persistImageDescription, StoredAiSettings ai, CancellationToken cancellationToken)
    {
        await _repository.SaveAsync(
            new SiteSettingsDto
            {
                PersistImageDescription = persistImageDescription,
                AiSettings = JsonSerializer.Serialize(ai, _json),
            },
            cancellationToken);
        _cached = null;
    }

    private async Task<(MediaCuratorSiteSettings Settings, string? ApiKey)> LoadAsync(CancellationToken cancellationToken)
    {
        if (_cached is { } cached && cached.Expires > _time.GetUtcNow())
        {
            return (cached.Settings, cached.ApiKey);
        }

        var stored = await _repository.GetAsync(cancellationToken);
        var ai = Deserialize(stored?.AiSettings);
        var apiKey = Unprotect(ai?.TypeSafeApiKey);
        var settings = Resolve(stored, ai, apiKey is not null);
        _cached = (settings, apiKey, _time.GetUtcNow() + CacheDuration);
        return (settings, apiKey);
    }

    /// <summary>Saved values win; anything never saved uses the built-in default.</summary>
    internal static MediaCuratorSiteSettings Resolve(SiteSettingsDto? stored, StoredAiSettings? ai, bool apiKeyConfigured) => new()
    {
        AiEnabled = ai?.AiEnabled ?? true,
        PersistImageDescription = stored?.PersistImageDescription ?? true,
        RecognitionImageSize = Math.Max(0, ai?.RecognitionImageSize ?? MediaCuratorDefaults.RecognitionEdgePixels),
        DescriptionProfileAlias = Blank(ai?.DescriptionProfileAlias),
        DescriptionReasoningEffort = ai?.DescriptionReasoningEffort ?? AiReasoningEffort.Low,
        ClassificationMethod = ai?.ClassificationMethod ?? ClassificationMethod.OneStep,
        DecisionEngine = ai?.DecisionEngine ?? DecisionEngine.UmbracoAi,
        DecisionProfileAlias = Blank(ai?.DecisionProfileAlias),
        DecisionReasoningEffort = ai?.DecisionReasoningEffort ?? AiReasoningEffort.None,
        JevModel = Blank(ai?.JevModel) ?? MediaCuratorDefaults.JevModel,
        JevApiKeyConfigured = apiKeyConfigured,
        MaxParallelAnalyses = ClampParallel(ai?.MaxParallelAnalyses ?? MediaCuratorDefaults.MaxParallelAnalyses),
        SavePreparedImages = ai?.SavePreparedImages ?? false,
        DetectPeople = ai?.DetectPeople ?? false,
    };

    internal static int ClampParallel(int value) => Math.Clamp(value, 1, MediaCuratorDefaults.MaxParallelAnalysesLimit);

    internal static StoredAiSettings? Deserialize(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return null;
        }

        try
        {
            return JsonSerializer.Deserialize<StoredAiSettings>(json, _json);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private string? Unprotect(string? protectedKey)
    {
        if (string.IsNullOrEmpty(protectedKey))
        {
            return null;
        }

        try
        {
            return _protector.Unprotect(protectedKey);
        }
        catch (CryptographicException ex)
        {
            // e.g. the data protection keys changed: the key has to be entered again.
            _logger?.LogWarning(ex, "MediaCurator: the stored TypeSafe API key could not be decrypted; enter it again in the setup.");
            return null;
        }
    }

    private static string? Blank(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static MediaCuratorSiteSettings Copy(MediaCuratorSiteSettings s) => new()
    {
        AiEnabled = s.AiEnabled,
        PersistImageDescription = s.PersistImageDescription,
        RecognitionImageSize = s.RecognitionImageSize,
        DescriptionProfileAlias = s.DescriptionProfileAlias,
        DescriptionReasoningEffort = s.DescriptionReasoningEffort,
        ClassificationMethod = s.ClassificationMethod,
        DecisionEngine = s.DecisionEngine,
        DecisionProfileAlias = s.DecisionProfileAlias,
        DecisionReasoningEffort = s.DecisionReasoningEffort,
        JevModel = s.JevModel,
        JevApiKeyConfigured = s.JevApiKeyConfigured,
        JevApiKeySource = s.JevApiKeySource,
        MaxParallelAnalyses = s.MaxParallelAnalyses,
        SavePreparedImages = s.SavePreparedImages,
        DetectPeople = s.DetectPeople,
    };
}

/// <summary>The JSON stored in <c>mediaCuratorSiteSettings.aiSettings</c>. Every value is optional so
/// settings added later use their default until the setup page is saved again.</summary>
internal sealed class StoredAiSettings
{
    public bool? AiEnabled { get; set; }

    public int? RecognitionImageSize { get; set; }

    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort? DescriptionReasoningEffort { get; set; }

    public ClassificationMethod? ClassificationMethod { get; set; }

    public DecisionEngine? DecisionEngine { get; set; }

    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort? DecisionReasoningEffort { get; set; }

    public string? JevModel { get; set; }

    /// <summary>Encrypted with ASP.NET Core data protection.</summary>
    public string? TypeSafeApiKey { get; set; }

    public int? MaxParallelAnalyses { get; set; }

    public bool? SavePreparedImages { get; set; }

    public bool? DetectPeople { get; set; }
}
