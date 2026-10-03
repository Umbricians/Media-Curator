using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Settings;

internal sealed class MediaCuratorSettingsService : IMediaCuratorSettingsService
{
    // Recognition reads settings once per image; a short cache keeps that off the database.
    private static readonly TimeSpan CacheDuration = TimeSpan.FromSeconds(30);

    /// <summary>The configuration section older versions read; imported into the database once.</summary>
    internal const string LegacySectionName = "MediaCurator";

    private static readonly JsonSerializerOptions _json = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter() },
    };

    private readonly IMediaCuratorSettingsRepository _repository;
    private readonly IDataProtector _protector;
    private readonly IConfiguration? _configuration;
    private readonly ILogger<MediaCuratorSettingsService>? _logger;
    private readonly TimeProvider _time;
    private readonly SemaphoreSlim _importLock = new(1, 1);
    private (MediaCuratorSiteSettings Settings, string? ApiKey, DateTimeOffset Expires)? _cached;

    public MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IDataProtectionProvider dataProtection,
        IConfiguration configuration,
        ILogger<MediaCuratorSettingsService> logger)
        : this(repository, dataProtection, configuration, logger, TimeProvider.System)
    {
    }

    internal MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IDataProtectionProvider dataProtection,
        IConfiguration? configuration,
        ILogger<MediaCuratorSettingsService>? logger,
        TimeProvider time)
    {
        _repository = repository;
        _protector = dataProtection.CreateProtector("Umbricians.MediaCurator.TypeSafeApiKey");
        _configuration = configuration;
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
        => _configuration?[MediaCuratorDefaults.TypeSafeApiKeyConfigurationKey] is { } key && !string.IsNullOrWhiteSpace(key)
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
        if (ai?.LegacyImported != true && HasLegacyAppSettings())
        {
            (stored, ai) = await ImportLegacyAppSettingsAsync(cancellationToken);
        }

        var apiKey = Unprotect(ai?.TypeSafeApiKey);
        var settings = Resolve(stored, ai, apiKey is not null);
        _cached = (settings, apiKey, _time.GetUtcNow() + CacheDuration);
        return (settings, apiKey);
    }

    /// <summary>
    /// Older versions read a "MediaCurator" app settings section. Its values are copied into the database
    /// once, filling only settings not saved yet, so upgrading keeps a site's profile, Jev key and AI
    /// switch. After that the section is ignored and can be deleted.
    /// </summary>
    private async Task<(SiteSettingsDto? Stored, StoredAiSettings Ai)> ImportLegacyAppSettingsAsync(CancellationToken cancellationToken)
    {
        await _importLock.WaitAsync(cancellationToken);
        try
        {
            var stored = await _repository.GetAsync(cancellationToken);
            var ai = Deserialize(stored?.AiSettings) ?? new StoredAiSettings();
            if (ai.LegacyImported)
            {
                return (stored, ai);
            }

            var section = _configuration!.GetSection(LegacySectionName);
            var imported = new List<string>();
            string? Read(string key)
            {
                var value = section[key];
                if (!string.IsNullOrWhiteSpace(value))
                {
                    imported.Add(key);
                    return value.Trim();
                }

                return null;
            }

            if (Read("MetadataOnly") is { } metadataOnly && bool.TryParse(metadataOnly, out var off) && ai.AiEnabled is null)
            {
                ai.AiEnabled = !off;
            }

            if (Read("RecognitionProfileAlias") is { } profile)
            {
                ai.DescriptionProfileAlias ??= profile;
            }

            if (Read("DecisionProfileAlias") is { } decisionProfile)
            {
                ai.DecisionProfileAlias ??= decisionProfile;
            }

            if (Read("MaxRecognitionEdgePixels") is { } size && int.TryParse(size, out var pixels))
            {
                ai.RecognitionImageSize ??= Math.Max(0, pixels);
            }

            if (Read("MaxParallelAnalyses") is { } parallel && int.TryParse(parallel, out var count))
            {
                ai.MaxParallelAnalyses ??= ClampParallel(count);
            }

            if (Read("DecisionEngine") is { } engine && Enum.TryParse<DecisionEngine>(engine, true, out var decisionEngine))
            {
                ai.DecisionEngine ??= decisionEngine;
            }

            if (Read("ClassificationMode") is { } mode && mode.Equals("SingleShot", StringComparison.OrdinalIgnoreCase))
            {
                ai.ClassificationMethod ??= ClassificationMethod.SingleCall;
            }

            if (Read("RecognitionPreparedImageTestFolder") is not null)
            {
                ai.SavePreparedImages ??= true;
            }

            if (Read("TypeSafe:ApiKey") is { } apiKey && ai.TypeSafeApiKey is null)
            {
                ai.TypeSafeApiKey = _protector.Protect(apiKey);
            }

            if (Read("TypeSafe:Model") is { } model)
            {
                ai.JevModel ??= model;
            }

            // Not settings any more: the classification scheme comes from each ruleset's rule.
            Read("ClassificationSchemeAlias");

            ai.LegacyImported = true;
            await WriteAsync(stored?.PersistImageDescription ?? ReadBool(section["PersistImageDescription"]) ?? true, ai, cancellationToken);
            _logger?.LogWarning(
                "MediaCurator: imported app settings ({Keys}) into the backoffice setup. Media Curator no longer reads the \"{Section}\" section; remove it from appsettings.",
                string.Join(", ", imported),
                LegacySectionName);
            return (await _repository.GetAsync(cancellationToken), ai);
        }
        finally
        {
            _importLock.Release();
        }
    }

    /// <summary>Old settings in the "MediaCurator" section; its "Secrets" sub-section is current configuration.</summary>
    private bool HasLegacyAppSettings()
        => _configuration?.GetSection(LegacySectionName).GetChildren()
            .Any(c => !c.Key.Equals("Secrets", StringComparison.OrdinalIgnoreCase)) == true;

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

    private static bool? ReadBool(string? value) => bool.TryParse(value, out var b) ? b : null;

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

    /// <summary>True once the old "MediaCurator" app settings section has been imported.</summary>
    public bool LegacyImported { get; set; }
}
