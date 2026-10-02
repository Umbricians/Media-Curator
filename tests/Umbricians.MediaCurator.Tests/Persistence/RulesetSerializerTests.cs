using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Persistence;

public class RulesetSerializerTests
{
    [Fact]
    public void Round_trips_a_nested_conditional_rule_tree()
    {
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "Umbricians.MediaCurator.Date",
                Settings = TestContext.Settings(("format", "yyyy/MM")),
                Fallback = UnresolvedBehavior.Unsorted,
                Children =
                [
                    new RuleNode
                    {
                        ProviderAlias = "Umbricians.MediaCurator.Alphabetical",
                        Condition = "2026/06",
                        Fallback = UnresolvedBehavior.Stop,
                    },
                ],
            },
        };

        var json = RulesetSerializer.Serialize(rules);
        var back = RulesetSerializer.Deserialize(json);

        var root = Assert.Single(back);
        Assert.Equal("Umbricians.MediaCurator.Date", root.ProviderAlias);
        Assert.Equal("yyyy/MM", root.Settings["format"]!.GetValue<string>());
        Assert.Equal(UnresolvedBehavior.Unsorted, root.Fallback);
        var child = Assert.Single(root.Children);
        Assert.Equal("2026/06", child.Condition);
        Assert.Equal(UnresolvedBehavior.Stop, child.Fallback);
    }

    [Fact]
    public void Serializes_enums_as_camel_case_strings()
    {
        var json = RulesetSerializer.Serialize([new RuleNode { ProviderAlias = "x", Fallback = UnresolvedBehavior.Unsorted }]);

        Assert.Contains("\"unsorted\"", json);
    }

    [Fact]
    public void Upgrades_legacy_unprefixed_provider_aliases_throughout_the_tree()
    {
        const string json = """
            [{"providerAlias":"MediaCurator.Date","settings":{"format":"yyyy"},
              "children":[{"providerAlias":"MediaCurator.Color","children":[]}]}]
            """;

        var root = Assert.Single(RulesetSerializer.Deserialize(json));

        Assert.Equal("Umbricians.MediaCurator.Date", root.ProviderAlias);
        Assert.Equal("yyyy", root.Settings["format"]!.GetValue<string>());
        Assert.Equal("Umbricians.MediaCurator.Color", Assert.Single(root.Children).ProviderAlias);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("  ")]
    public void Empty_or_null_json_deserializes_to_empty_list(string? json)
    {
        Assert.Empty(RulesetSerializer.Deserialize(json));
    }
}
