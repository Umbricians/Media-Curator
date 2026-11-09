using System.ComponentModel.DataAnnotations;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

internal class MediaCuratorSiteSettingsModel
{
    /// <summary>When false, Media Curator makes no AI calls.</summary>
    public bool AiEnabled { get; set; } = true;

    public bool PersistImageDescription { get; set; } = true;

    /// <summary>Longest edge in pixels of images sent to the AI; 0 sends the original file.</summary>
    [Range(0, 4096)]
    public int RecognitionImageSize { get; set; } = MediaCuratorDefaults.RecognitionEdgePixels;

    public string? DescriptionProfileAlias { get; set; }

    public AiReasoningEffort DescriptionReasoningEffort { get; set; } = AiReasoningEffort.Low;

    public ClassificationMethod ClassificationMethod { get; set; } = ClassificationMethod.OneStep;

    public DecisionEngine DecisionEngine { get; set; } = DecisionEngine.UmbracoAi;

    public string? DecisionProfileAlias { get; set; }

    public AiReasoningEffort DecisionReasoningEffort { get; set; } = AiReasoningEffort.None;

    [MaxLength(100)]
    public string JevModel { get; set; } = MediaCuratorDefaults.JevModel;

    /// <summary>Read-only: true when a TypeSafe API key is available. The key itself is never returned.</summary>
    public bool JevApiKeyConfigured { get; set; }

    /// <summary>Read-only: where the TypeSafe API key comes from. Server configuration locks the backoffice key.</summary>
    public ApiKeySource JevApiKeySource { get; set; }

    [Range(1, MediaCuratorDefaults.MaxParallelAnalysesLimit)]
    public int MaxParallelAnalyses { get; set; } = MediaCuratorDefaults.MaxParallelAnalyses;

    public bool SavePreparedImages { get; set; }

    /// <summary>Also decide, when images are analyzed, whether they show people (media tree badges).</summary>
    public bool DetectPeople { get; set; }

    public static MediaCuratorSiteSettingsModel From(MediaCuratorSiteSettings settings) => new()
    {
        AiEnabled = settings.AiEnabled,
        PersistImageDescription = settings.PersistImageDescription,
        RecognitionImageSize = settings.RecognitionImageSize,
        DescriptionProfileAlias = settings.DescriptionProfileAlias,
        DescriptionReasoningEffort = settings.DescriptionReasoningEffort,
        ClassificationMethod = settings.ClassificationMethod,
        DecisionEngine = settings.DecisionEngine,
        DecisionProfileAlias = settings.DecisionProfileAlias,
        DecisionReasoningEffort = settings.DecisionReasoningEffort,
        JevModel = settings.JevModel,
        JevApiKeyConfigured = settings.JevApiKeyConfigured,
        JevApiKeySource = settings.JevApiKeySource,
        MaxParallelAnalyses = settings.MaxParallelAnalyses,
        SavePreparedImages = settings.SavePreparedImages,
        DetectPeople = settings.DetectPeople,
    };

    public MediaCuratorSiteSettings ToSettings() => new()
    {
        AiEnabled = AiEnabled,
        PersistImageDescription = PersistImageDescription,
        RecognitionImageSize = RecognitionImageSize,
        DescriptionProfileAlias = DescriptionProfileAlias,
        DescriptionReasoningEffort = DescriptionReasoningEffort,
        ClassificationMethod = ClassificationMethod,
        DecisionEngine = DecisionEngine,
        DecisionProfileAlias = DecisionProfileAlias,
        DecisionReasoningEffort = DecisionReasoningEffort,
        JevModel = string.IsNullOrWhiteSpace(JevModel) ? MediaCuratorDefaults.JevModel : JevModel.Trim(),
        MaxParallelAnalyses = MaxParallelAnalyses,
        SavePreparedImages = SavePreparedImages,
        DetectPeople = DetectPeople,
    };
}

/// <summary>Sets or (with an empty key) removes the TypeSafe API key used by Jev.</summary>
internal class TypeSafeApiKeyModel
{
    [MaxLength(500)]
    public string? ApiKey { get; set; }
}

/// <summary>What the AI settings form can offer on this site.</summary>
internal class AiSettingsOptionsModel
{
    /// <summary>Umbraco.AI chat profiles.</summary>
    public List<AiProfileOptionModel> Profiles { get; set; } = [];

    /// <summary>The alias of Umbraco.AI's default chat profile, used when a step has no profile, or null.</summary>
    public string? DefaultProfileAlias { get; set; }

    public int MaxParallelAnalysesLimit { get; set; } = MediaCuratorDefaults.MaxParallelAnalysesLimit;

    /// <summary>The server configuration key that supplies the TypeSafe API key instead of the backoffice.</summary>
    public string TypeSafeApiKeyConfigurationKey { get; set; } = MediaCuratorDefaults.TypeSafeApiKeyConfigurationKey;

    /// <summary>Where prepared images are saved when that diagnostics option is on, relative to the site root.</summary>
    public string PreparedImagesFolder { get; set; } = MediaCuratorDefaults.PreparedImagesFolder;
}

internal class AiProfileOptionModel
{
    public required string Alias { get; set; }

    public required string Name { get; set; }

    public string? Model { get; set; }
}
