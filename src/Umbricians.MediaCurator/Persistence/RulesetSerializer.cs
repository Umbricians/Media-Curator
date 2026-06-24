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
        => string.IsNullOrWhiteSpace(json)
            ? []
            : JsonSerializer.Deserialize<List<RuleNode>>(json, _options) ?? [];
}
