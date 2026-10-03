using System.ComponentModel.DataAnnotations;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class MediaCuratorSiteSettingsModel
{
    public bool PersistImageDescription { get; set; } = true;

    /// <summary>Longest edge in pixels of images sent to the AI; 0 sends the original file.</summary>
    [Range(0, 4096)]
    public int RecognitionImageSize { get; set; } = MediaCuratorOptions.DefaultRecognitionEdgePixels;

    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort DescriptionReasoningEffort { get; set; } = AiReasoningEffort.Low;

    public DecisionEngine DecisionEngine { get; set; } = DecisionEngine.UmbracoAi;

    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort DecisionReasoningEffort { get; set; } = AiReasoningEffort.None;

    [Range(1, MediaCuratorOptions.MaxParallelAnalysesLimit)]
    public int MaxParallelAnalyses { get; set; } = MediaCuratorOptions.DefaultMaxParallelAnalyses;

    public static MediaCuratorSiteSettingsModel From(MediaCuratorSiteSettings settings) => new()
    {
        PersistImageDescription = settings.PersistImageDescription,
        RecognitionImageSize = settings.RecognitionImageSize,
        DescriptionProfileAlias = settings.DescriptionProfileAlias,
        DescriptionReasoningEffort = settings.DescriptionReasoningEffort,
        DecisionEngine = settings.DecisionEngine,
        DecisionProfileAlias = settings.DecisionProfileAlias,
        DecisionReasoningEffort = settings.DecisionReasoningEffort,
        MaxParallelAnalyses = settings.MaxParallelAnalyses,
    };

    public MediaCuratorSiteSettings ToSettings() => new()
    {
        PersistImageDescription = PersistImageDescription,
        RecognitionImageSize = RecognitionImageSize,
        DescriptionProfileAlias = DescriptionProfileAlias,
        DescriptionReasoningEffort = DescriptionReasoningEffort,
        DecisionEngine = DecisionEngine,
        DecisionProfileAlias = DecisionProfileAlias,
        DecisionReasoningEffort = DecisionReasoningEffort,
        MaxParallelAnalyses = MaxParallelAnalyses,
    };
}

/// <summary>What the AI settings form can offer on this site.</summary>
public class AiSettingsOptionsModel
{
    /// <summary>Umbraco.AI chat profiles.</summary>
    public List<AiProfileOptionModel> Profiles { get; set; } = [];

    /// <summary>The profile used when a step has no profile of its own (appsettings
    /// <c>MediaCurator:RecognitionProfileAlias</c>), or null for Umbraco.AI's default chat profile.</summary>
    public string? FallbackProfileAlias { get; set; }

    /// <summary>True when a TypeSafe API key is configured, so Jev can be chosen.</summary>
    public bool JevAvailable { get; set; }

    public int MaxParallelAnalysesLimit { get; set; } = MediaCuratorOptions.MaxParallelAnalysesLimit;
}

public class AiProfileOptionModel
{
    public required string Alias { get; set; }

    public required string Name { get; set; }

    public string? Model { get; set; }
}
