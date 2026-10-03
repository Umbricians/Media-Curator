using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator;

/// <summary>Bound from the "MediaCurator" configuration section.</summary>
public sealed class MediaCuratorOptions
{
    public const string SectionName = "MediaCurator";

    public const int DefaultRecognitionEdgePixels = 768;

    public const int DefaultMaxParallelAnalyses = 4;

    /// <summary>Upper bound for <see cref="MaxParallelAnalyses"/>, so a typo cannot flood the AI provider.</summary>
    public const int MaxParallelAnalysesLimit = 16;

    /// <summary>When true, MediaCurator makes no AI calls at all; all non-AI providers
    /// still work (cost control, §8).</summary>
    public bool MetadataOnly { get; set; }

    /// <summary>Optional Umbraco.AI chat profile alias used for image recognition.
    /// When unset, the default chat profile is used.</summary>
    public string? RecognitionProfileAlias { get; set; }

    /// <summary>Optional default classification scheme alias (e.g. <c>dewey-pd</c>, <c>lcc</c>)
    /// used when the Analyze image Automate action does not specify a scheme.</summary>
    public string? ClassificationSchemeAlias { get; set; }

    /// <summary>Longest edge in pixels for images sent to AI recognition. Larger originals are
    /// downscaled (JPEG) before upload. Set to <c>0</c> to send the full file unchanged.
    /// Default for the backoffice setting.</summary>
    public int MaxRecognitionEdgePixels { get; set; } = DefaultRecognitionEdgePixels;

    /// <summary>Default reasoning effort for the image description step.</summary>
    public AiReasoningEffort DescriptionReasoningEffort { get; set; } = AiReasoningEffort.Low;

    /// <summary>Default engine for AI decisions (classification drill-down).</summary>
    public DecisionEngine DecisionEngine { get; set; } = DecisionEngine.UmbracoAi;

    /// <summary>Optional Umbraco.AI profile for decisions. When unset, the recognition profile is used.</summary>
    public string? DecisionProfileAlias { get; set; }

    /// <summary>Default reasoning effort for decisions.</summary>
    public AiReasoningEffort DecisionReasoningEffort { get; set; } = AiReasoningEffort.None;

    /// <summary>Default for how many images are analyzed at the same time.</summary>
    public int MaxParallelAnalyses { get; set; } = DefaultMaxParallelAnalyses;

    /// <summary>When a classification scheme is used, controls whether codes are picked in one
    /// prompt or via hierarchical drill-down (default).</summary>
    public RecognitionClassificationMode ClassificationMode { get; set; } =
        RecognitionClassificationMode.Hierarchical;

    /// <summary>Maximum drill-down levels when <see cref="ClassificationMode"/> is
    /// <see cref="RecognitionClassificationMode.Hierarchical"/>.</summary>
    public int MaxClassificationDepth { get; set; } = 4;

    /// <summary>Default for saving AI image descriptions on media items so classification can
    /// reuse text without another vision call. Overridden by backoffice setup when saved.</summary>
    public bool PersistImageDescription { get; set; } = true;

    /// <summary>When set, every image payload sent to AI recognition is also written to this folder
    /// (after downscale/orient). For local debugging only — leave unset in production.</summary>
    public string? RecognitionPreparedImageTestFolder { get; set; }

    /// <summary>TypeSafe (Jev) connection, used when the decision engine is Jev.</summary>
    public TypeSafeOptions TypeSafe { get; set; } = new();
}

/// <summary>Bound from "MediaCurator:TypeSafe". Keep the API key in configuration or user secrets;
/// it is never stored in the database or sent to the backoffice.</summary>
public sealed class TypeSafeOptions
{
    public string? ApiKey { get; set; }

    public string Model { get; set; } = "jev-latest";

    public string Endpoint { get; set; } = "https://api.typesafe.ai/v1/systemone";

    public int TimeoutSeconds { get; set; } = 15;

    public bool IsConfigured => !string.IsNullOrWhiteSpace(ApiKey);
}
