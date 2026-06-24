namespace Umbricians.MediaCurator;

/// <summary>Bound from the "MediaCurator" configuration section.</summary>
public sealed class MediaCuratorOptions
{
    public const string SectionName = "MediaCurator";

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
    /// downscaled (JPEG) before upload. Set to <c>0</c> to send the full file unchanged.</summary>
    public int MaxRecognitionEdgePixels { get; set; } = 1024;

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
}
