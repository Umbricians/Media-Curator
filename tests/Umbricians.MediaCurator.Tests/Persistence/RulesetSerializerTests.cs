using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Persistence;

public class RulesetSerializerTests
{
    [Test]
    public void Round_trips_a_nested_conditional_rule_tree()
    {
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "Umbricians.MediaCurator.Date",
                Settings = CurationContexts.Settings(("format", "yyyy/MM")),
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

        var root = TestAssert.Single(back);
        Assert.That(root.ProviderAlias, Is.EqualTo("Umbricians.MediaCurator.Date"));
        Assert.That(root.Settings["format"]!.GetValue<string>(), Is.EqualTo("yyyy/MM"));
        Assert.That(root.Fallback, Is.EqualTo(UnresolvedBehavior.Unsorted));
        var child = TestAssert.Single(root.Children);
        Assert.That(child.Condition, Is.EqualTo("2026/06"));
        Assert.That(child.Fallback, Is.EqualTo(UnresolvedBehavior.Stop));
    }

    [Test]
    public void Serializes_enums_as_camel_case_strings()
    {
        var json = RulesetSerializer.Serialize([new RuleNode { ProviderAlias = "x", Fallback = UnresolvedBehavior.Unsorted }]);

        Assert.That(json, Does.Contain("\"unsorted\""));
    }

    [Test]
    public void Upgrades_legacy_unprefixed_provider_aliases_throughout_the_tree()
    {
        const string json = """
            [{"providerAlias":"MediaCurator.Date","settings":{"format":"yyyy"},
              "children":[{"providerAlias":"MediaCurator.Color","children":[]}]}]
            """;

        var root = TestAssert.Single(RulesetSerializer.Deserialize(json));

        Assert.That(root.ProviderAlias, Is.EqualTo("Umbricians.MediaCurator.Date"));
        Assert.That(root.Settings["format"]!.GetValue<string>(), Is.EqualTo("yyyy"));
        Assert.That(TestAssert.Single(root.Children).ProviderAlias, Is.EqualTo("Umbricians.MediaCurator.Color"));
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("  ")]
    public void Empty_or_null_json_deserializes_to_empty_list(string? json)
    {
        Assert.That(RulesetSerializer.Deserialize(json), Is.Empty);
    }
}
