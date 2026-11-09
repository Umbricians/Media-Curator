using System.Text.Json.Nodes;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Rules;

/// <summary>Which rule produced a folder segment: the rule's provider and settings, and which of
/// that provider's own segments it is (0 = the first one it produced). Used to order each folder
/// level by the provider that produced it (<see cref="ICurationFolderOrder"/>).</summary>
/// <param name="Settings">The rule's settings (shared with the rule; treat as read-only).</param>
public sealed record FolderSegmentOrigin(string ProviderAlias, JsonObject Settings, int SegmentIndex);

/// <summary>The result of running an item through a rule chain. <paramref name="SegmentOrigins"/>
/// parallels <paramref name="Segments"/> (null only when built outside the executor).</summary>
internal sealed record RuleChainResult(
    IReadOnlyList<FolderSegment> Segments,
    bool Stopped,
    IReadOnlyList<RuleOutcome> Outcomes,
    IReadOnlyList<string> Notes,
    IReadOnlyList<FolderSegmentOrigin>? SegmentOrigins = null)
{
    /// <summary>True when the chain produced at least one folder level and was not stopped.</summary>
    public bool HasTarget => !Stopped && Segments.Count > 0;
}

/// <summary>
/// Walks a ruleset's rule tree for one item: at each level the first rule whose condition
/// matches the parent's resolved value runs; its result contributes folder segments and its
/// children form the next level (§4.2). Fallback behaviour applies when a rule cannot resolve.
/// </summary>
internal sealed class RuleChainExecutor
{
    /// <summary>The folder an item goes into when a rule cannot resolve and its fallback is
    /// <see cref="UnresolvedBehavior.Unsorted"/>. Ordered after the level's other folders.</summary>
    public const string UnsortedFolderName = "Unsorted";

    private readonly CurationProviderCollection _providers;

    public RuleChainExecutor(CurationProviderCollection providers) => _providers = providers;

    /// <summary>The registered providers rules resolve against.</summary>
    internal CurationProviderCollection Providers => _providers;

    public async Task<RuleChainResult> ExecuteAsync(
        IReadOnlyList<RuleNode> rules,
        CurationContext context,
        CancellationToken cancellationToken = default)
    {
        var segments = new List<FolderSegment>();
        var origins = new List<FolderSegmentOrigin>();
        var outcomes = new List<RuleOutcome>();
        var notes = new List<string>();

        var stopped = await ExecuteLevelAsync(rules, context, parentValue: null, segments, origins, outcomes, notes, cancellationToken);
        return new RuleChainResult(segments, stopped, outcomes, notes, origins);
    }

    private async Task<bool> ExecuteLevelAsync(
        IReadOnlyList<RuleNode> siblings,
        CurationContext context,
        string? parentValue,
        List<FolderSegment> segments,
        List<FolderSegmentOrigin> origins,
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
            origins.AddRange(result.Segments.Select((_, i) => new FolderSegmentOrigin(provider.Alias, node.Settings, i)));
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
                    // The fallback stands in for the provider's first segment.
                    segments.Add(new FolderSegment(UnsortedFolderName));
                    origins.Add(new FolderSegmentOrigin(provider.Alias, node.Settings, 0));
                    break;
                case UnresolvedBehavior.Skip:
                default:
                    break;
            }
        }

        outcomes.Add(new RuleOutcome(provider.Alias, value));

        if (node.Children.Count > 0)
        {
            return await ExecuteLevelAsync(node.Children, context, value, segments, origins, outcomes, notes, ct);
        }

        return false;
    }

    private static bool ConditionMatches(string? condition, string? parentValue)
        => string.IsNullOrWhiteSpace(condition)
           || string.Equals(condition, parentValue, StringComparison.OrdinalIgnoreCase);
}
