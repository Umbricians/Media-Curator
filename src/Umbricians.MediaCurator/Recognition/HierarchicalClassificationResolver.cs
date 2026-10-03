using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>One classification decision: pick the best of <see cref="Candidates"/> for the described image.</summary>
/// <param name="Parent">The code already chosen above this level (step-by-step only), or null.</param>
/// <param name="CandidateNotes">Optional context per candidate code, shown after its name: the main class
/// in a one-step choice ("Sociology"), or what a class contains in a step-by-step one.</param>
public sealed record ClassificationChoice(
    IClassificationScheme Scheme,
    string Description,
    IReadOnlyList<AiTag> Tags,
    ClassificationEntry? Parent,
    IReadOnlyList<ClassificationEntry> Candidates,
    IReadOnlyDictionary<string, string>? CandidateNotes = null)
{
    /// <summary>"390 Customs and Costumes (Sociology)": the candidate as the AI sees it.</summary>
    public string Label(ClassificationEntry entry, string separator = " ")
        => CandidateNotes?.GetValueOrDefault(entry.Code) is { Length: > 0 } note
            ? $"{entry.Code}{separator}{entry.Name} ({note})"
            : $"{entry.Code}{separator}{entry.Name}";
}

/// <summary>
/// Picks a classification code from the image description. Small schemes are decided in ONE step over
/// every final code, each labelled with its main class: deciding the main class first commits before
/// the AI can see what each class holds (in the 1876 Dewey list "Amusements" sits under "Fine Arts" and
/// "Geography and Travels" under "History"), so photos of people drifted into "Customs and Costumes".
/// Larger schemes drill down level by level, with each class labelled by what it contains. Either way
/// the stored code resolves to its full scheme path, so folders still nest by class.
/// </summary>
internal static class HierarchicalClassificationResolver
{
    /// <summary>
    /// Identifies how a code would be decided now, stored with each AI code so codes decided an older way
    /// can be re-decided. Bump a version when a change should reclassify existing images (prompt wording
    /// alone usually should not).
    /// </summary>
    public static string MethodFor(
        IClassificationScheme scheme,
        Settings.ClassificationMethod method,
        int maxDepth,
        int oneStepLimit)
    {
        if (method == Settings.ClassificationMethod.SingleCall)
        {
            return $"{scheme.Alias}:single-shot-v1";
        }

        var finals = oneStepLimit > 0 ? FinalEntries(scheme, maxDepth).Count : int.MaxValue;
        return finals <= oneStepLimit
            ? $"{scheme.Alias}:one-step-v1"
            : $"{scheme.Alias}:drill-down-v2";
    }

    /// <summary>Most sub-category names listed per class when drilling down step by step.</summary>
    private const int MaxChildHints = 12;

    /// <param name="chooseAsync">Returns the picked code for one decision, or null when none was made.</param>
    /// <param name="oneStepLimit">Decide in one step when the scheme has at most this many final codes;
    /// 0 always drills down step by step.</param>
    public static async Task<string?> ResolveAsync(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        Func<ClassificationChoice, CancellationToken, Task<string?>> chooseAsync,
        int maxDepth,
        CancellationToken cancellationToken,
        int oneStepLimit = 0)
    {
        if (maxDepth <= 0)
        {
            return null;
        }

        if (oneStepLimit > 0)
        {
            var finals = FinalEntries(scheme, maxDepth);
            if (finals.Count > 1 && finals.Count <= oneStepLimit)
            {
                return await ChooseOneStepAsync(scheme, description, tags, finals, chooseAsync, cancellationToken);
            }

            if (finals.Count == 1)
            {
                return finals[0].Code;
            }
        }

        return await DrillDownAsync(scheme, description, tags, chooseAsync, maxDepth, cancellationToken);
    }

    /// <summary>The codes a drill-down could end on: entries with no children, or at the depth limit.</summary>
    internal static IReadOnlyList<ClassificationEntry> FinalEntries(IClassificationScheme scheme, int maxDepth)
    {
        var finals = new List<ClassificationEntry>();

        void Visit(string? parentCode, int depth)
        {
            foreach (var child in scheme.GetChildren(parentCode))
            {
                if (depth == maxDepth || scheme.GetChildren(child.Code).Count == 0)
                {
                    finals.Add(child);
                }
                else
                {
                    Visit(child.Code, depth + 1);
                }
            }
        }

        Visit(null, 1);
        return finals;
    }

    private static async Task<string?> ChooseOneStepAsync(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        IReadOnlyList<ClassificationEntry> finals,
        Func<ClassificationChoice, CancellationToken, Task<string?>> chooseAsync,
        CancellationToken cancellationToken)
    {
        // Each code carries its ancestors' names, e.g. "385 Railroad Transportation (Sociology › Commerce
        // and Communication)", so the choice keeps the context the main classes gave the drill-down.
        var notes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var entry in finals)
        {
            var ancestors = scheme.GetPath(entry.Code).SkipLast(1).Select(e => e.Name).ToList();
            if (ancestors.Count > 0)
            {
                notes[entry.Code] = string.Join(" › ", ancestors);
            }
        }

        var picked = await chooseAsync(
            new ClassificationChoice(scheme, description, tags, null, finals, notes),
            cancellationToken);
        return Match(finals, picked)?.Code;
    }

    private static async Task<string?> DrillDownAsync(
        IClassificationScheme scheme,
        string description,
        IReadOnlyList<AiTag> tags,
        Func<ClassificationChoice, CancellationToken, Task<string?>> chooseAsync,
        int maxDepth,
        CancellationToken cancellationToken)
    {
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

            // Show what each class contains, so the AI does not have to guess from its name alone.
            var notes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            if (depth + 1 < maxDepth)
            {
                foreach (var child in children)
                {
                    var grandchildren = scheme.GetChildren(child.Code);
                    if (grandchildren.Count > 0)
                    {
                        var names = grandchildren.Take(MaxChildHints).Select(g => g.Name);
                        notes[child.Code] = "includes " + string.Join(", ", names)
                            + (grandchildren.Count > MaxChildHints ? ", …" : string.Empty);
                    }
                }
            }

            var picked = await chooseAsync(
                new ClassificationChoice(scheme, description, tags, currentEntry, children, notes),
                cancellationToken);
            var match = Match(children, picked);
            if (match is null)
            {
                break;
            }

            currentEntry = match;
            currentCode = match.Code;
        }

        return currentCode;
    }

    private static ClassificationEntry? Match(IReadOnlyList<ClassificationEntry> candidates, string? picked)
        => string.IsNullOrWhiteSpace(picked)
            ? null
            : candidates.FirstOrDefault(c => string.Equals(c.Code, picked.Trim(), StringComparison.OrdinalIgnoreCase));
}
