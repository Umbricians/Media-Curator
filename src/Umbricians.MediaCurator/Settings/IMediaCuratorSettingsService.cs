using System.Text.Json.Serialization;

namespace Umbricians.MediaCurator.Settings;

/// <summary>Site-wide Media Curator settings (backoffice setup + appsettings defaults).</summary>
public interface IMediaCuratorSettingsService
{
    Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default);
}

public sealed class MediaCuratorSiteSettings
{
    /// <summary>When true, vision output is stored on media and reused for later classification runs.</summary>
    public bool PersistImageDescription { get; set; } = true;

    /// <summary>Longest edge in pixels of images sent to the AI; <c>0</c> sends the original file.</summary>
    public int RecognitionImageSize { get; set; } = MediaCuratorOptions.DefaultRecognitionEdgePixels;

    /// <summary>Umbraco.AI profile that describes images. Empty uses the configured recognition profile.</summary>
    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort DescriptionReasoningEffort { get; set; } = AiReasoningEffort.Low;

    /// <summary>What makes the non-deterministic decisions, such as picking a classification code.</summary>
    public DecisionEngine DecisionEngine { get; set; } = DecisionEngine.UmbracoAi;

    /// <summary>Umbraco.AI profile for decisions. Empty uses the description profile.</summary>
    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort DecisionReasoningEffort { get; set; } = AiReasoningEffort.None;

    /// <summary>How many images are analyzed at the same time.</summary>
    public int MaxParallelAnalyses { get; set; } = MediaCuratorOptions.DefaultMaxParallelAnalyses;
}

/// <summary>Reasoning effort requested from reasoning-capable models. <see cref="Default"/> leaves it to
/// the Umbraco.AI profile (or the model). A reasoning effort set on the profile itself always wins.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<AiReasoningEffort>))]
public enum AiReasoningEffort
{
    Default,
    None,
    Low,
    Medium,
    High,
}

/// <summary>Engine used for AI decisions that are not deterministic.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<DecisionEngine>))]
public enum DecisionEngine
{
    /// <summary>A chat model through Umbraco.AI (default).</summary>
    UmbracoAi,

    /// <summary>TypeSafe's Jev System One model. Needs <c>MediaCurator:TypeSafe:ApiKey</c>; falls back to
    /// Umbraco.AI when the key is missing or a call fails.</summary>
    Jev,
}
