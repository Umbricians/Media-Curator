using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class ClassificationPromptBuilderTests
{
    [Fact]
    public void Build_without_scheme_returns_base_prompt()
    {
        var prompt = ClassificationPromptBuilder.Build(null);

        Assert.Equal(ClassificationPromptBuilder.BasePrompt, prompt);
    }

    [Fact]
    public void BuildSingleShot_with_scheme_includes_entries_and_classification_code_instruction()
    {
        var scheme = new DeweyPublicDomainScheme();
        var prompt = ClassificationPromptBuilder.BuildSingleShotSchemePrompt(scheme);

        Assert.Contains("classificationCode", prompt);
        Assert.Contains("770|Photography", prompt);
        Assert.Contains(scheme.Name, prompt);
    }

    [Fact]
    public void BuildRefine_includes_only_candidate_children()
    {
        var scheme = new DeweyPublicDomainScheme();
        var candidates = scheme.GetChildren("380");
        var prompt = ClassificationPromptBuilder.BuildRefinePrompt(
            scheme,
            "high-speed train at a station",
            [new AiTag("train", 0.9)],
            scheme.GetEntry("380"),
            candidates);

        Assert.Contains("385|Railroad Transportation", prompt);
        Assert.Contains("388|Transportation", prompt);
        Assert.DoesNotContain("590|Zoology", prompt);
        Assert.DoesNotContain("770|Photography", prompt);
    }
}
