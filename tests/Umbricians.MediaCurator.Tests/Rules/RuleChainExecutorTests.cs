using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Rules;

public class RuleChainExecutorTests
{
    private static RuleChainExecutor Executor(params ICurationProvider[] providers)
        => new(new CurationProviderCollection(() => providers));

    [Test]
    public async Task Chains_rules_into_a_path()
    {
        var executor = Executor(FakeProvider.Fixed("p.date", "2026"), FakeProvider.Fixed("p.color", "Red"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.date",
                Children = [new RuleNode { ProviderAlias = "p.color" }],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.HasTarget, Is.True);
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "Red"]));
        Assert.That(result.Outcomes.Select(o => o.ProviderAlias), Is.EqualTo(["p.date", "p.color"]));
    }

    [Test]
    public async Task Conditional_child_runs_only_when_parent_value_matches()
    {
        var executor = Executor(FakeProvider.Fixed("p.tag", "product-shot"), FakeProvider.Fixed("p.color", "Red"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.tag",
                Children =
                [
                    new RuleNode { ProviderAlias = "p.color", Condition = "screenshot" },
                    new RuleNode { ProviderAlias = "p.color", Condition = "Product-Shot" },
                ],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        // The screenshot branch is skipped; the product-shot branch matches case-insensitively.
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["product-shot", "Red"]));
    }

    [Test]
    public async Task No_matching_conditional_child_ends_the_chain_cleanly()
    {
        var executor = Executor(FakeProvider.Fixed("p.tag", "logo"), FakeProvider.Fixed("p.color", "Red"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.tag",
                Children = [new RuleNode { ProviderAlias = "p.color", Condition = "people" }],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["logo"]));
        Assert.That(result.Stopped, Is.False);
    }

    [Test]
    public async Task Skip_fallback_contributes_nothing_and_continues()
    {
        var executor = Executor(FakeProvider.Unresolvable("p.exif"), FakeProvider.Fixed("p.alpha", "A"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.exif",
                Fallback = UnresolvedBehavior.Skip,
                Children = [new RuleNode { ProviderAlias = "p.alpha" }],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["A"]));
    }

    [Test]
    public async Task Unsorted_fallback_adds_unsorted_segment_and_continues()
    {
        var executor = Executor(FakeProvider.Unresolvable("p.exif"), FakeProvider.Fixed("p.alpha", "A"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.exif",
                Fallback = UnresolvedBehavior.Unsorted,
                Children = [new RuleNode { ProviderAlias = "p.alpha" }],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["Unsorted", "A"]));
    }

    [Test]
    public async Task Stop_fallback_aborts_the_chain()
    {
        var executor = Executor(FakeProvider.Unresolvable("p.exif"), FakeProvider.Fixed("p.alpha", "A"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.exif",
                Fallback = UnresolvedBehavior.Stop,
                Children = [new RuleNode { ProviderAlias = "p.alpha" }],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.Stopped, Is.True);
        Assert.That(result.HasTarget, Is.False);
        Assert.That(result.Segments, Is.Empty);
    }

    [Test]
    public async Task Unknown_provider_is_noted_and_level_skipped()
    {
        var executor = Executor(FakeProvider.Fixed("p.known", "X"));
        var rules = new List<RuleNode> { new() { ProviderAlias = "p.missing" } };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.HasTarget, Is.False);
        Assert.That(result.Notes.Any(n => n.Contains("p.missing")), Is.True);
    }

    [Test]
    public async Task Rule_settings_reach_the_provider()
    {
        string? seen = null;
        var provider = new FakeProvider("p.settings", ctx =>
        {
            seen = ctx.GetSetting("flavor", "none");
            return CurationResult.Resolved("ok", new FolderSegment("ok"));
        });
        var executor = Executor(provider);
        var rules = new List<RuleNode>
        {
            new() { ProviderAlias = "p.settings", Settings = CurationContexts.Settings(("flavor", "vanilla")) },
        };

        await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(seen, Is.EqualTo("vanilla"));
    }

    [Test]
    public async Task Records_which_rule_and_provider_segment_produced_each_folder_level()
    {
        var multi = new FakeProvider("p.date", _ => CurationResult.Resolved("2026/06", ["2026", "06"]));
        var executor = Executor(multi, FakeProvider.Unresolvable("p.color"), FakeProvider.Fixed("p.tag", "A"));
        var dateSettings = CurationContexts.Settings(("format", "yyyy/MM"));
        var rules = new List<RuleNode>
        {
            new()
            {
                ProviderAlias = "p.date",
                Settings = dateSettings,
                Children =
                [
                    new RuleNode
                    {
                        ProviderAlias = "p.color",
                        Fallback = UnresolvedBehavior.Unsorted,
                        Children = [new RuleNode { ProviderAlias = "p.tag" }],
                    },
                ],
            },
        };

        var result = await executor.ExecuteAsync(rules, CurationContexts.Create());

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "06", RuleChainExecutor.UnsortedFolderName, "A"]));
        var origins = result.SegmentOrigins!;
        Assert.That(origins.Select(o => o.ProviderAlias), Is.EqualTo(["p.date", "p.date", "p.color", "p.tag"]));
        // The Unsorted fallback stands in for the provider's first segment.
        Assert.That(origins.Select(o => o.SegmentIndex), Is.EqualTo([0, 1, 0, 0]));
        Assert.That(origins[0].Settings, Is.SameAs(dateSettings));
    }
}
