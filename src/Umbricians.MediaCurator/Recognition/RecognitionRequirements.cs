using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Property requirements for the recognition pipeline (§7).</summary>
internal static class RecognitionRequirements
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Recognition";

    /// <summary>The recognition cache: tags, description, the AI's classification code and how it was chosen.
    /// Lets recognition run once per image, and lets classification tell AI codes (which it may update
    /// when the way codes are chosen changes) from codes an editor entered.</summary>
    public static PropertyRequirement Cache { get; } = new()
    {
        Alias = UmbracoAiRecognitionService.TagsPropertyAlias,
        Name = "AI tags (Media Curator)",
        EditorAlias = "Umbraco.TextArea",
        EditorUiAlias = "Umb.PropertyEditorUi.TextArea",
        ValueType = "TEXT",
        Mandatory = false,
        Description = "Recognition output cached by Media Curator so AI runs once per image.",
    };

    public static PropertyRequirement Description { get; } = new()
    {
        Alias = UmbracoAiRecognitionService.DescriptionPropertyAlias,
        Name = "AI image description (Media Curator)",
        EditorAlias = "Umbraco.TextArea",
        EditorUiAlias = "Umb.PropertyEditorUi.TextArea",
        ValueType = "TEXT",
        Mandatory = false,
        Description =
            "One-sentence summary of the image subject. When enabled in setup, Media Curator reuses this " +
            "for classification instead of sending the image to AI again.",
    };
}
