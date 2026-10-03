using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;
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
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;
    private readonly TimeProvider _time;
    private (MediaCuratorSiteSettings Settings, DateTimeOffset Expires)? _cached;

    public MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IOptionsMonitor<MediaCuratorOptions> options)
        : this(repository, options, TimeProvider.System)
    {
    }

    internal MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IOptionsMonitor<MediaCuratorOptions> options,
        TimeProvider time)
    {
        _repository = repository;
        _options = options;
        _time = time;
    }

    public async Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
    {
        if (_cached is { } cached && cached.Expires > _time.GetUtcNow())
        {
            return Copy(cached.Settings);
        }

        var stored = await _repository.GetAsync(cancellationToken);
        var settings = Resolve(stored, _options.CurrentValue);
        _cached = (settings, _time.GetUtcNow() + CacheDuration);
        return Copy(settings);
    }

    public async Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
    {
        var ai = new StoredAiSettings
        {
            RecognitionImageSize = Math.Max(0, settings.RecognitionImageSize),
            DescriptionProfileAlias = Blank(settings.DescriptionProfileAlias),
            DescriptionReasoningEffort = settings.DescriptionReasoningEffort,
            DecisionEngine = settings.DecisionEngine,
            DecisionProfileAlias = Blank(settings.DecisionProfileAlias),
            DecisionReasoningEffort = settings.DecisionReasoningEffort,
            MaxParallelAnalyses = ClampParallel(settings.MaxParallelAnalyses),
        };

        await _repository.SaveAsync(
            new SiteSettingsDto
            {
                PersistImageDescription = settings.PersistImageDescription,
                AiSettings = JsonSerializer.Serialize(ai, _json),
            },
            cancellationToken);
        _cached = null;
    }

    /// <summary>Saved values win; anything never saved falls back to appsettings, then code defaults.</summary>
    internal static MediaCuratorSiteSettings Resolve(SiteSettingsDto? stored, MediaCuratorOptions options)
    {
        var ai = Deserialize(stored?.AiSettings);
        return new MediaCuratorSiteSettings
        {
            PersistImageDescription = stored?.PersistImageDescription ?? options.PersistImageDescription,
            RecognitionImageSize = Math.Max(0, ai?.RecognitionImageSize ?? options.MaxRecognitionEdgePixels),
            DescriptionProfileAlias = Blank(ai?.DescriptionProfileAlias),
            DescriptionReasoningEffort = ai?.DescriptionReasoningEffort ?? options.DescriptionReasoningEffort,
            DecisionEngine = ai?.DecisionEngine ?? options.DecisionEngine,
            DecisionProfileAlias = Blank(ai?.DecisionProfileAlias),
            DecisionReasoningEffort = ai?.DecisionReasoningEffort ?? options.DecisionReasoningEffort,
            MaxParallelAnalyses = ClampParallel(ai?.MaxParallelAnalyses ?? options.MaxParallelAnalyses),
        };
    }

    internal static int ClampParallel(int value) => Math.Clamp(value, 1, MediaCuratorOptions.MaxParallelAnalysesLimit);

    private static StoredAiSettings? Deserialize(string? json)
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

    private static string? Blank(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static MediaCuratorSiteSettings Copy(MediaCuratorSiteSettings s) => new()
    {
        PersistImageDescription = s.PersistImageDescription,
        RecognitionImageSize = s.RecognitionImageSize,
        DescriptionProfileAlias = s.DescriptionProfileAlias,
        DescriptionReasoningEffort = s.DescriptionReasoningEffort,
        DecisionEngine = s.DecisionEngine,
        DecisionProfileAlias = s.DecisionProfileAlias,
        DecisionReasoningEffort = s.DecisionReasoningEffort,
        MaxParallelAnalyses = s.MaxParallelAnalyses,
    };
}

/// <summary>The JSON stored in <c>mediaCuratorSiteSettings.aiSettings</c>. Every value is optional so
/// settings added later fall back to appsettings until the setup page is saved again.</summary>
internal sealed class StoredAiSettings
{
    public int? RecognitionImageSize { get; set; }

    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort? DescriptionReasoningEffort { get; set; }

    public DecisionEngine? DecisionEngine { get; set; }

    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort? DecisionReasoningEffort { get; set; }

    public int? MaxParallelAnalyses { get; set; }
}
