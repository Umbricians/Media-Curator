using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Rules;

/// <summary>The result of running an item through a rule chain.</summary>
public sealed record RuleChainResult(
    IReadOnlyList<FolderSegment> Segments,
    bool Stopped,
    IReadOnlyList<RuleOutcome> Outcomes,
    IReadOnlyList<string> Notes)
{
    /// <summary>True when the chain produced at least one folder level and was not stopped.</summary>
    public bool HasTarget => !Stopped && Segments.Count > 0;
}

/// <summary>
/// Walks a ruleset's rule tree for one item: at each level the first rule whose condition
/// matches the parent's resolved value runs; its result contributes folder segments and its
/// children form the next level (§4.2). Fallback behaviour applies when a rule cannot resolve.
/// </summary>
public sealed class RuleChainExecutor
{
    private readonly CurationProviderCollection _providers;

    public RuleChainExecutor(CurationProviderCollection providers) => _providers = providers;

    public async Task<RuleChainResult> ExecuteAsync(
        IReadOnlyList<RuleNode> rules,
        CurationContext context,
        CancellationToken cancellationToken = default)
    {
        var segments = new List<FolderSegment>();
        var outcomes = new List<RuleOutcome>();
        var notes = new List<string>();

        var stopped = await ExecuteLevelAsync(rules, context, parentValue: null, segments, outcomes, notes, cancellationToken);
        return new RuleChainResult(segments, stopped, outcomes, notes);
    }

    private async Task<bool> ExecuteLevelAsync(
        IReadOnlyList<RuleNode> siblings,
        CurationContext context,
        string? parentValue,
        List<FolderSegment> segments,
        List<RuleOutcome> outcomes,
        List<string> notes,
        CancellationToken ct)
    {
        var node = siblings.FirstOrDefault(n => ConditionMatches(n.Condition, parentValue));
        if (node is null)
        {
            return false;
        }

        var provider = _providers.GetByAlias(node.ProviderAlias);
        if (provider is null)
        {
            notes.Add($"Unknown provider '{node.ProviderAlias}' — level skipped.");
            return false;
        }

        var nodeContext = context with
        {
            Settings = node.Settings,
            ParentOutcomes = outcomes.ToArray(),
        };

        var result = await provider.ResolveAsync(nodeContext, ct);

        string? value = null;
        if (result.IsResolved)
        {
            segments.AddRange(result.Segments);
            value = result.ResolvedValue;
        }
        else
        {
            switch (node.Fallback)
            {
                case UnresolvedBehavior.Stop:
                    notes.Add($"'{provider.Alias}' unresolved — chain stopped, item left in place.");
                    return true;
                case UnresolvedBehavior.Unsorted:
                    segments.Add(new FolderSegment("Unsorted"));
                    break;
                case UnresolvedBehavior.Skip:
                default:
                    break;
            }
        }

        outcomes.Add(new RuleOutcome(provider.Alias, value));

        if (node.Children.Count > 0)
        {
            return await ExecuteLevelAsync(node.Children, context, value, segments, outcomes, notes, ct);
        }

        return false;
    }

    private static bool ConditionMatches(string? condition, string? parentValue)
        => string.IsNullOrWhiteSpace(condition)
           || string.Equals(condition, parentValue, StringComparison.OrdinalIgnoreCase);
}
