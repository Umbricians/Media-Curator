using System.Text.Json;
using System.Text.Json.Serialization;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Persistence;

/// <summary>JSON (de)serialization of the rule tree stored in the ruleset row. The same
/// shape is used by the management API and the uSync serializer (later milestone), so it
/// stays camelCased with enums as strings.</summary>
public static class RulesetSerializer
{
    private static readonly JsonSerializerOptions _options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
    };

    public static string Serialize(IReadOnlyList<RuleNode> rules)
        => JsonSerializer.Serialize(rules, _options);

    public static List<RuleNode> Deserialize(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return [];
        var rules = JsonSerializer.Deserialize<List<RuleNode>>(json, _options) ?? [];
        UpgradeLegacyAliases(rules);
        return rules;
    }

    // Built-in providers were originally aliased "MediaCurator.*"; rulesets saved before the
    // "Umbricians." prefix would otherwise match no provider in the engine or the designer.
    private const string LegacyAliasPrefix = "MediaCurator.";
    private const string AliasPrefix = "Umbricians.";

    private static void UpgradeLegacyAliases(List<RuleNode> rules)
    {
        foreach (var rule in rules)
        {
            if (rule.ProviderAlias.StartsWith(LegacyAliasPrefix, StringComparison.Ordinal))
            {
                rule.ProviderAlias = AliasPrefix + rule.ProviderAlias;
            }

            UpgradeLegacyAliases(rule.Children);
        }
    }
}
