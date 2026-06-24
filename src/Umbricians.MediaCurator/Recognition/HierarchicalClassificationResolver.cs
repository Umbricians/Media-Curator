using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Drills down a classification scheme one level at a time using text-only prompts.</summary>
internal static class HierarchicalClassificationResolver
{
    public static async Task<string?> ResolveAsync(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        Func<string, CancellationToken, Task<string?>> chatAsync,
        int maxDepth,
        CancellationToken cancellationToken)
    {
        if (maxDepth <= 0)
        {
            return null;
        }

        string? currentCode = null;
        ClassificationEntry? currentEntry = null;

        for (var depth = 0; depth < maxDepth; depth++)
        {
            var children = scheme.GetChildren(currentCode);
            if (children.Count == 0)
            {
                break;
            }

            if (children.Count == 1)
            {
                currentEntry = children[0];
                currentCode = currentEntry.Code;
                continue;
            }

            var prompt = ClassificationPromptBuilder.BuildRefinePrompt(
                scheme,
                description,
                tags,
                currentEntry,
                children);

            var responseText = await chatAsync(prompt, cancellationToken);
            var picked = RecognitionResponseParser.ParseClassificationCode(responseText);
            if (picked is null)
            {
                break;
            }

            var match = children.FirstOrDefault(c =>
                string.Equals(c.Code, picked, StringComparison.OrdinalIgnoreCase));
            if (match is null)
            {
                break;
            }

            currentEntry = match;
            currentCode = match.Code;
        }

        return currentCode;
    }
}
