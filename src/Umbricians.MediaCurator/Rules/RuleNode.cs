using System.Text.Json.Nodes;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Rules;

/// <summary>
/// A configured rule in a ruleset's rule tree: a provider plus its settings, with optional
/// conditional children (§4.2). Serialized as JSON into the ruleset row.
/// </summary>
public sealed class RuleNode
{
    public required string ProviderAlias { get; set; }

    public JsonObject Settings { get; set; } = new();

    public UnresolvedBehavior Fallback { get; set; } = UnresolvedBehavior.Skip;

    /// <summary>When set, this rule only applies if the parent rule resolved to this value
    /// (case-insensitive). Null/empty = unconditional.</summary>
    public string? Condition { get; set; }

    public List<RuleNode> Children { get; set; } = [];
}
