using System.Text.Json.Nodes;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class RuleNodeModel
{
    public required string ProviderAlias { get; set; }

    /// <summary>Provider settings as a free-form JSON object keyed by setting field alias.</summary>
    public JsonObject? Settings { get; set; }

    /// <summary>"skip" | "unsorted" | "stop"</summary>
    public string Fallback { get; set; } = "skip";

    public string? Condition { get; set; }

    public List<RuleNodeModel> Children { get; set; } = [];

    public static RuleNodeModel From(RuleNode node) => new()
    {
        ProviderAlias = node.ProviderAlias,
        Settings = (JsonObject?)JsonNode.Parse(node.Settings.ToJsonString()),
        Fallback = node.Fallback.ToString().ToLowerInvariant(),
        Condition = node.Condition,
        Children = node.Children.Select(From).ToList(),
    };

    public RuleNode ToRuleNode() => new()
    {
        ProviderAlias = ProviderAlias,
        Settings = (JsonObject?)JsonNode.Parse(Settings?.ToJsonString() ?? "{}") ?? new JsonObject(),
        Fallback = Enum.TryParse<UnresolvedBehavior>(Fallback, ignoreCase: true, out var f) ? f : UnresolvedBehavior.Skip,
        Condition = string.IsNullOrWhiteSpace(Condition) ? null : Condition,
        Children = Children.Select(c => c.ToRuleNode()).ToList(),
    };
}

public class RulesetModel
{
    public Guid Key { get; set; }
    public required Guid ScopeRootKey { get; set; }
    public required string Name { get; set; }
    public string? CultureName { get; set; }
    public bool Enabled { get; set; } = true;
    public List<RuleNodeModel> Rules { get; set; } = [];
    public DateTime DateUpdated { get; set; }

    public static RulesetModel From(Ruleset ruleset) => new()
    {
        Key = ruleset.Key,
        ScopeRootKey = ruleset.ScopeRootKey,
        Name = ruleset.Name,
        CultureName = ruleset.CultureName,
        Enabled = ruleset.Enabled,
        Rules = ruleset.Rules.Select(RuleNodeModel.From).ToList(),
        DateUpdated = ruleset.DateUpdated,
    };

    public Ruleset ToRuleset() => new()
    {
        Key = Key == Guid.Empty ? Guid.NewGuid() : Key,
        ScopeRootKey = ScopeRootKey,
        Name = Name,
        CultureName = string.IsNullOrWhiteSpace(CultureName) ? null : CultureName,
        Enabled = Enabled,
        Rules = Rules.Select(r => r.ToRuleNode()).ToList(),
    };
}
