using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class HierarchicalClassificationResolverTests
{
    [Fact]
    public async Task Drills_down_through_scheme_levels()
    {
        var scheme = new DeweyPublicDomainScheme();
        var prompts = new List<string>();
        var responses = new Queue<string>([
            """{"classificationCode":"300"}""",
            """{"classificationCode":"380"}""",
            """{"classificationCode":"385"}""",
        ]);

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "high-speed train at a railway station",
            [new AiTag("train", 0.95), new AiTag("railway-station", 0.9)],
            (choice, _) =>
            {
                prompts.Add(ClassificationPromptBuilder.BuildRefinePrompt(choice));
                return Task.FromResult(RecognitionResponseParser.ParseClassificationCode(responses.Dequeue()));
            },
            maxDepth: 4,
            CancellationToken.None);

        Assert.Equal("385", code);
        Assert.Equal(3, prompts.Count);
        Assert.Contains("300|Sociology", prompts[0]);
        Assert.Contains("380|Commerce and Communication", prompts[1]);
        Assert.Contains("385|Railroad Transportation", prompts[2]);
    }

    [Fact]
    public async Task Stops_at_leaf_when_no_children_remain()
    {
        var scheme = new DeweyPublicDomainScheme();
        var responses = new Queue<string>([
            """{"classificationCode":"700"}""",
            """{"classificationCode":"770"}""",
        ]);
        var calls = 0;

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "a camera photo",
            [new AiTag("photography", 0.9)],
            (_, _) =>
            {
                calls++;
                return Task.FromResult(RecognitionResponseParser.ParseClassificationCode(responses.Dequeue()));
            },
            maxDepth: 4,
            CancellationToken.None);

        Assert.Equal("770", code);
        Assert.Equal(2, calls);
    }

    [Fact]
    public async Task Invalid_pick_returns_last_valid_code()
    {
        var scheme = new DeweyPublicDomainScheme();
        var responses = new Queue<string>([
            """{"classificationCode":"300"}""",
            """{"classificationCode":"not-a-real-code"}""",
        ]);

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "train at station",
            [new AiTag("train", 0.9)],
            (_, _) => Task.FromResult(RecognitionResponseParser.ParseClassificationCode(responses.Dequeue())),
            maxDepth: 4,
            CancellationToken.None);

        Assert.Equal("300", code);
    }

    [Fact]
    public async Task Each_decision_gets_the_parent_and_only_its_direct_children()
    {
        var scheme = new DeweyPublicDomainScheme();
        var choices = new List<ClassificationChoice>();
        var picks = new Queue<string>(["300", "380"]);

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "train",
            [],
            (choice, _) =>
            {
                choices.Add(choice);
                return Task.FromResult<string?>(picks.Count > 0 ? picks.Dequeue() : null);
            },
            maxDepth: 4,
            CancellationToken.None);

        Assert.Equal("380", code);
        Assert.Null(choices[0].Parent);
        Assert.Contains(choices[0].Candidates, c => c.Code == "300");
        Assert.Equal("300", choices[1].Parent!.Code);
        Assert.All(choices[1].Candidates, c => Assert.StartsWith("3", c.Code));
    }

    [Fact]
    public async Task Picks_are_matched_ignoring_case_and_whitespace()
    {
        var scheme = new LccOutlineScheme();
        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "a map",
            [],
            (_, _) => Task.FromResult<string?>(" g "),
            maxDepth: 1,
            CancellationToken.None);

        Assert.Equal("G", code);
    }

    [Fact]
    public void Final_codes_are_entries_without_sub_categories_or_at_the_depth_limit()
    {
        var dewey = new DeweyPublicDomainScheme();
        var lcc = new LccOutlineScheme();

        var deep = HierarchicalClassificationResolver.FinalEntries(dewey, maxDepth: 4).Select(e => e.Code).ToList();
        Assert.Contains("385", deep);
        Assert.Contains("910", deep);
        Assert.DoesNotContain("380", deep); // has sub-categories
        Assert.DoesNotContain("300", deep);

        var shallow = HierarchicalClassificationResolver.FinalEntries(dewey, maxDepth: 2).Select(e => e.Code).ToList();
        Assert.Contains("380", shallow);
        Assert.DoesNotContain("385", shallow);

        // LCC main classes without sub-classes are final codes too.
        var lccFinals = HierarchicalClassificationResolver.FinalEntries(lcc, maxDepth: 4);
        Assert.Contains(lccFinals, e => lcc.GetChildren(null).Contains(e));
    }

    [Fact]
    public async Task Small_schemes_are_decided_in_one_step_with_ancestors_as_context()
    {
        var scheme = new DeweyPublicDomainScheme();
        var choices = new List<ClassificationChoice>();

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "friends taking a selfie in an airport",
            [],
            (choice, _) =>
            {
                choices.Add(choice);
                return Task.FromResult<string?>("910");
            },
            maxDepth: 4,
            CancellationToken.None,
            oneStepLimit: 255);

        Assert.Equal("910", code);
        var only = Assert.Single(choices);
        Assert.Null(only.Parent);
        Assert.Equal("History", only.CandidateNotes!["910"]);
        Assert.Equal("790 Amusements (Fine Arts)", only.Label(only.Candidates.Single(c => c.Code == "790")));
    }

    [Fact]
    public async Task One_step_pick_outside_the_list_resolves_to_nothing()
    {
        var code = await HierarchicalClassificationResolver.ResolveAsync(
            new DeweyPublicDomainScheme(),
            "x",
            [],
            (_, _) => Task.FromResult<string?>("300"), // a class, not a final code
            maxDepth: 4,
            CancellationToken.None,
            oneStepLimit: 255);

        Assert.Null(code);
    }

    [Fact]
    public async Task Larger_schemes_drill_down_with_what_each_class_includes()
    {
        var choices = new List<ClassificationChoice>();
        var picks = new Queue<string>(["700", "790"]);

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            new DeweyPublicDomainScheme(),
            "a nightclub",
            [],
            (choice, _) =>
            {
                choices.Add(choice);
                return Task.FromResult<string?>(picks.Dequeue());
            },
            maxDepth: 4,
            CancellationToken.None,
            oneStepLimit: 10); // fewer than Dewey's final codes

        Assert.Equal("790", code);
        Assert.StartsWith("includes Landscape Gardening, Architecture", choices[0].CandidateNotes!["700"]);
        Assert.Contains("Amusements", choices[0].CandidateNotes!["700"]);
        Assert.Contains("700|Fine Arts (includes Landscape Gardening", ClassificationPromptBuilder.BuildRefinePrompt(choices[0]));
    }
}

