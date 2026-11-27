using System.Text.Json.Serialization;

namespace Umbricians.MediaCurator.Settings;

/// <summary>Site-wide Media Curator settings, edited in the backoffice setup and stored in the database.</summary>
internal interface IMediaCuratorSettingsService
{
    Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default);

    /// <summary>The TypeSafe API key for Jev: from server configuration when set there, otherwise the key saved
    /// in the backoffice; null when there is none. Never sent to the backoffice.</summary>
    Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default);

    /// <summary>Stores (encrypted) or, with null or blank, removes the TypeSafe API key saved in the backoffice.
    /// Ignored while the key comes from server configuration.</summary>
    Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default);
}

internal sealed class MediaCuratorSiteSettings
{
    /// <summary>When false, Media Curator makes no AI calls at all; rules that need no AI still work.</summary>
    public bool AiEnabled { get; set; } = true;

    /// <summary>When true, vision output is stored on media and reused for later classification runs.</summary>
    public bool PersistImageDescription { get; set; } = true;

    /// <summary>Longest edge in pixels of images sent to the AI; <c>0</c> sends the original file.</summary>
    public int RecognitionImageSize { get; set; } = MediaCuratorDefaults.RecognitionEdgePixels;

    /// <summary>Umbraco.AI profile that describes images. Empty uses Umbraco.AI's default chat profile.</summary>
    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort DescriptionReasoningEffort { get; set; } = AiReasoningEffort.Low;

    /// <summary>How a classification code is chosen.</summary>
    public ClassificationMethod ClassificationMethod { get; set; } = ClassificationMethod.OneStep;

    /// <summary>What makes the non-deterministic decisions, such as picking a classification code.</summary>
    public DecisionEngine DecisionEngine { get; set; } = DecisionEngine.UmbracoAi;

    /// <summary>Umbraco.AI profile for decisions. Empty uses the description profile.</summary>
    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort DecisionReasoningEffort { get; set; } = AiReasoningEffort.None;

    /// <summary>Jev model name sent to TypeSafe.</summary>
    public string JevModel { get; set; } = MediaCuratorDefaults.JevModel;

    /// <summary>True when a TypeSafe API key is available (the key itself is never exposed).</summary>
    public bool JevApiKeyConfigured { get; set; }

    /// <summary>Where the TypeSafe API key comes from.</summary>
    public ApiKeySource JevApiKeySource { get; set; } = ApiKeySource.None;

    /// <summary>How many images are analyzed at the same time.</summary>
    public int MaxParallelAnalyses { get; set; } = MediaCuratorDefaults.MaxParallelAnalyses;

    /// <summary>Diagnostics: also write every prepared image sent to the AI to
    /// <see cref="MediaCuratorDefaults.PreparedImagesFolder"/>.</summary>
    public bool SavePreparedImages { get; set; }

    /// <summary>When true, analyzing an image also decides whether it shows people, so the media tree can
    /// badge those images and the folders above them (privacy / model-release review).</summary>
    public bool DetectPeople { get; set; }
}

/// <summary>Reasoning effort requested from reasoning-capable models. <see cref="Default"/> leaves it to
/// the Umbraco.AI profile (or the model). A reasoning effort set on the profile itself always wins.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<AiReasoningEffort>))]
internal enum AiReasoningEffort
{
    Default,
    None,
    Low,
    Medium,
    High,
}

/// <summary>Engine used for AI decisions that are not deterministic.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<DecisionEngine>))]
internal enum DecisionEngine
{
    /// <summary>A chat model through Umbraco.AI (default).</summary>
    UmbracoAi,

    /// <summary>TypeSafe's Jev System One model. Needs a TypeSafe API key in the setup; falls back to
    /// Umbraco.AI when the key is missing or a call fails.</summary>
    Jev,
}

/// <summary>Where a secret such as the TypeSafe API key comes from.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<ApiKeySource>))]
internal enum ApiKeySource
{
    None,

    /// <summary>Saved (encrypted) in the backoffice setup.</summary>
    Backoffice,

    /// <summary>Server configuration (<see cref="MediaCuratorDefaults.TypeSafeApiKeyConfigurationKey"/>), which
    /// wins over a key saved in the backoffice.</summary>
    ServerConfiguration,
}

/// <summary>How a classification code is chosen when a ruleset classifies images.</summary>
[JsonConverter(typeof(JsonStringEnumConverter<ClassificationMethod>))]
internal enum ClassificationMethod
{
    /// <summary>Describe the image, then pick the final code in one decision with each code's classes
    /// shown (schemes with up to 255 final codes; larger ones go level by level). Default.</summary>
    OneStep,

    /// <summary>Describe the image, then pick one level of the scheme at a time.</summary>
    StepByStep,

    /// <summary>One vision call that describes the image and picks the code from the whole scheme.</summary>
    SingleCall,
}
