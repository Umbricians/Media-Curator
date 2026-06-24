using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Property requirements for the recognition pipeline (§7).</summary>
internal static class RecognitionRequirements
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Recognition";

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
