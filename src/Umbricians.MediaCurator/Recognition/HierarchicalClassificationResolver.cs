using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>One drill-down decision: pick the best of <see cref="Candidates"/> for the described image.</summary>
public sealed record ClassificationChoice(
    IClassificationScheme Scheme,
    string Description,
    IReadOnlyList<AiTag> Tags,
    ClassificationEntry? Parent,
    IReadOnlyList<ClassificationEntry> Candidates);

/// <summary>Drills down a classification scheme one level at a time from the image description.
/// Each level is one decision, made by Umbraco.AI or Jev (see <c>chooseAsync</c>).</summary>
internal static class HierarchicalClassificationResolver
{
    /// <param name="chooseAsync">Returns the picked code for one level, or null when no decision was made.</param>
    public static async Task<string?> ResolveAsync(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        Func<ClassificationChoice, CancellationToken, Task<string?>> chooseAsync,
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

            var picked = await chooseAsync(
                new ClassificationChoice(scheme, description, tags, currentEntry, children),
                cancellationToken);
            if (string.IsNullOrWhiteSpace(picked))
            {
                break;
            }

            var match = children.FirstOrDefault(c =>
                string.Equals(c.Code, picked.Trim(), StringComparison.OrdinalIgnoreCase));
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
