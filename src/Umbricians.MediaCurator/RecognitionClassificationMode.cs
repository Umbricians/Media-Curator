namespace Umbricians.MediaCurator;

/// <summary>How AI picks a classification code when a scheme is configured.</summary>
public enum RecognitionClassificationMode
{
    /// <summary>Vision for description/tags, then text-only drill-down through scheme children.</summary>
    Hierarchical,

    /// <summary>Single vision call with the full scheme list in the prompt.</summary>
    SingleShot,
}
