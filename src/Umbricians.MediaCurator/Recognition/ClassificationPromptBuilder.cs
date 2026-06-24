using System.Text;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Builds scheme-aware recognition prompts for AI classification code suggestion.</summary>
internal static class ClassificationPromptBuilder
{
    internal const string BasePrompt =
        "You are cataloguing an uploaded image for a digital media library. Look at the whole image and " +
        "describe the main subject in one clear sentence — name concrete things such as food, people, " +
        "animals, vehicles, products, buildings, or places (e.g. \"a pizza with toppings on a wooden board\"). " +
        "Do not describe abstract patterns, shadows, textures, or background details unless they are " +
        "clearly the only subject. " +
        "Respond with ONLY a JSON object, no markdown fences, shaped exactly like: " +
        "{\"description\":\"one sentence about the main subject\",\"tags\":[{\"name\":\"tag\",\"confidence\":0.95}]} " +
        "Use 3-8 lowercase single- or hyphenated-word tags for subject, setting, and activity " +
        "(e.g. \"pizza\", \"food\", \"train\", \"railway-station\", \"product-shot\"). " +
        "Do not use bare color names (e.g. \"black\", \"white\") unless the image is primarily a color study. " +
        "Confidence between 0 and 1.";

    /// <summary>Vision step: description and tags only (no classification codes).</summary>
    public static string BuildDescribePrompt() => BasePrompt;

    /// <summary>Single-shot vision prompt including the full scheme list (legacy mode).</summary>
    public static string Build(IClassificationScheme? scheme)
    {
        if (scheme is null)
        {
            return BuildDescribePrompt();
        }

        return BuildSingleShotSchemePrompt(scheme);
    }

    public static string BuildSingleShotSchemePrompt(IClassificationScheme scheme)
    {
        var builder = new StringBuilder(BasePrompt);
        builder.AppendLine();
        builder.AppendLine();
        builder.Append("Also pick the single best classification code for the PRIMARY SUBJECT from the \"");
        builder.Append(scheme.Name);
        builder.AppendLine("\" scheme.");
        builder.AppendLine(
            "Choose the code whose name best matches what is depicted (e.g. a train → transportation or railroad, " +
            "not an unrelated science category).");
        builder.AppendLine("Extend the JSON shape to include \"classificationCode\" set to an exact code from this list:");
        foreach (var entry in scheme.GetAllEntries())
        {
            builder.Append(entry.Code);
            builder.Append('|');
            builder.AppendLine(entry.Name);
        }

        builder.Append("Example: {\"description\":\"one sentence\",\"tags\":[{\"name\":\"building\",\"confidence\":0.9}],\"classificationCode\":\"");
        builder.Append(scheme.GetAllEntries().FirstOrDefault()?.Code ?? "CODE");
        builder.Append("\"}");
        return builder.ToString();
    }

    /// <summary>Text-only drill-down step: pick one code from direct children of the current level.</summary>
    public static string BuildRefinePrompt(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        ClassificationEntry? parent,
        IReadOnlyList<ClassificationEntry> candidates)
    {
        var builder = new StringBuilder();
        builder.Append("Classify media for a library using the \"");
        builder.Append(scheme.Name);
        builder.AppendLine("\" scheme.");
        builder.Append("Image summary: ");
        builder.AppendLine(description);
        if (tags.Count > 0)
        {
            builder.Append("Tags: ");
            builder.AppendLine(string.Join(", ", tags.Select(t => t.Name)));
        }

        if (parent is not null)
        {
            builder.Append("Already classified under: ");
            builder.Append(parent.Code);
            builder.Append(' ');
            builder.AppendLine(parent.Name);
        }

        builder.AppendLine();
        builder.AppendLine("Pick the single best code for the PRIMARY SUBJECT from ONLY this list:");
        foreach (var entry in candidates)
        {
            builder.Append(entry.Code);
            builder.Append('|');
            builder.AppendLine(entry.Name);
        }

        builder.AppendLine("Respond with ONLY a JSON object, no markdown fences: {\"classificationCode\":\"CODE\"}");
        return builder.ToString();
    }
}
