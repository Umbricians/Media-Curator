using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Rules;

public class RuleChainExecutorTests
{
    private static RuleChainExecutor Executor(params ICurationProvider[] providers)
        => new(new CurationProviderCollection(() => providers));

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.True(result.HasTarget);
        Assert.Equal(["2026", "Red"], result.Segments.Select(s => s.Name));
        Assert.Equal(["p.date", "p.color"], result.Outcomes.Select(o => o.ProviderAlias));
    }

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        // The screenshot branch is skipped; the product-shot branch matches case-insensitively.
        Assert.Equal(["product-shot", "Red"], result.Segments.Select(s => s.Name));
    }

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.Equal(["logo"], result.Segments.Select(s => s.Name));
        Assert.False(result.Stopped);
    }

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.Equal(["A"], result.Segments.Select(s => s.Name));
    }

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.Equal(["Unsorted", "A"], result.Segments.Select(s => s.Name));
    }

    [Fact]
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.True(result.Stopped);
        Assert.False(result.HasTarget);
        Assert.Empty(result.Segments);
    }

    [Fact]
    public async Task Unknown_provider_is_noted_and_level_skipped()
    {
        var executor = Executor(FakeProvider.Fixed("p.known", "X"));
        var rules = new List<RuleNode> { new() { ProviderAlias = "p.missing" } };

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.False(result.HasTarget);
        Assert.Contains(result.Notes, n => n.Contains("p.missing"));
    }

    [Fact]
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
            new() { ProviderAlias = "p.settings", Settings = TestContext.Settings(("flavor", "vanilla")) },
        };

        await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.Equal("vanilla", seen);
    }

    [Fact]
    public async Task Records_which_rule_and_provider_segment_produced_each_folder_level()
    {
        var multi = new FakeProvider("p.date", _ => CurationResult.Resolved("2026/06", ["2026", "06"]));
        var executor = Executor(multi, FakeProvider.Unresolvable("p.color"), FakeProvider.Fixed("p.tag", "A"));
        var dateSettings = TestContext.Settings(("format", "yyyy/MM"));
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

        var result = await executor.ExecuteAsync(rules, TestContext.Create());

        Assert.Equal(["2026", "06", RuleChainExecutor.UnsortedFolderName, "A"], result.Segments.Select(s => s.Name));
        var origins = result.SegmentOrigins!;
        Assert.Equal(["p.date", "p.date", "p.color", "p.tag"], origins.Select(o => o.ProviderAlias));
        // The Unsorted fallback stands in for the provider's first segment.
        Assert.Equal([0, 1, 0, 0], origins.Select(o => o.SegmentIndex));
        Assert.Same(dateSettings, origins[0].Settings);
    }
}
