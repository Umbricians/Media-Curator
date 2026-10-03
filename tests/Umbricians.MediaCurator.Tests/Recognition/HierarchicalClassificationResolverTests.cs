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
}
