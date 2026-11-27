using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class HierarchicalClassificationResolverTests
{
    [Test]
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

        Assert.That(code, Is.EqualTo("385"));
        Assert.That(prompts.Count, Is.EqualTo(3));
        Assert.That(prompts[0], Does.Contain("300|Sociology"));
        Assert.That(prompts[1], Does.Contain("380|Commerce and Communication"));
        Assert.That(prompts[2], Does.Contain("385|Railroad Transportation"));
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("770"));
        Assert.That(calls, Is.EqualTo(2));
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("300"));
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("380"));
        Assert.That(choices[0].Parent, Is.Null);
        Assert.That(choices[0].Candidates.Any(c => c.Code == "300"), Is.True);
        Assert.That(choices[1].Parent!.Code, Is.EqualTo("300"));
        foreach (var c in choices[1].Candidates)
        {
            Assert.That(c.Code, Does.StartWith("3"));
        }
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("G"));
    }

    // The prompt lists choices as "CODE|Name", and models sometimes answer with the whole line ("PEOPLE|People").
    [Test]
    public async Task A_pick_that_repeats_the_whole_choice_is_matched_level_by_level()
    {
        var responses = new Queue<string>([
            """{"classificationCode":"700|Fine Arts"}""",
            """{"classificationCode":"770|Photography"}""",
        ]);

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            new DeweyPublicDomainScheme(),
            "a camera photo",
            [],
            (_, _) => Task.FromResult(RecognitionResponseParser.ParseClassificationCode(responses.Dequeue())),
            maxDepth: 2,
            CancellationToken.None);

        Assert.That(code, Is.EqualTo("770"));
    }

    [Test]
    public async Task A_pick_that_repeats_the_whole_choice_is_matched_in_one_step()
    {
        var code = await HierarchicalClassificationResolver.ResolveAsync(
            new WebAssetRoleScheme(),
            "a company logo on white",
            [],
            (_, _) => Task.FromResult(RecognitionResponseParser.ParseClassificationCode("""{"classificationCode":"BRD1|Logo (Branding)"}""")),
            maxDepth: 4,
            CancellationToken.None,
            oneStepLimit: 255);

        Assert.That(code, Is.EqualTo("BRD1"));
    }

    [Test]
    public void Final_codes_are_entries_without_sub_categories_or_at_the_depth_limit()
    {
        var dewey = new DeweyPublicDomainScheme();
        var lcc = new LccOutlineScheme();

        var deep = HierarchicalClassificationResolver.FinalEntries(dewey, maxDepth: 4).Select(e => e.Code).ToList();
        Assert.That(deep, Does.Contain("385"));
        Assert.That(deep, Does.Contain("910"));
        Assert.That(deep, Does.Not.Contain("380")); // has sub-categories
        Assert.That(deep, Does.Not.Contain("300"));

        var shallow = HierarchicalClassificationResolver.FinalEntries(dewey, maxDepth: 2).Select(e => e.Code).ToList();
        Assert.That(shallow, Does.Contain("380"));
        Assert.That(shallow, Does.Not.Contain("385"));

        // LCC main classes without sub-classes are final codes too.
        var lccFinals = HierarchicalClassificationResolver.FinalEntries(lcc, maxDepth: 4);
        Assert.That(lccFinals.Any(e => lcc.GetChildren(null).Contains(e)), Is.True);
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("910"));
        var only = TestAssert.Single(choices);
        Assert.That(only.Parent, Is.Null);
        Assert.That(only.CandidateNotes!["910"], Is.EqualTo("History"));
        Assert.That(only.Label(only.Candidates.Single(c => c.Code == "790")), Is.EqualTo("790 Amusements (Fine Arts)"));
    }

    [Test]
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

        Assert.That(code, Is.Null);
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("790"));
        Assert.That(choices[0].CandidateNotes!["700"], Does.StartWith("includes Landscape Gardening, Architecture"));
        Assert.That(choices[0].CandidateNotes!["700"], Does.Contain("Amusements"));
        Assert.That(ClassificationPromptBuilder.BuildRefinePrompt(choices[0]), Does.Contain("700|Fine Arts (includes Landscape Gardening"));
    }
}

