using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class ClassificationPromptBuilderTests
{
    [Test]
    public void Build_without_scheme_returns_base_prompt()
    {
        var prompt = ClassificationPromptBuilder.Build(null);

        Assert.That(prompt, Is.EqualTo(ClassificationPromptBuilder.BasePrompt));
    }

    [Test]
    public void BuildSingleShot_with_scheme_includes_entries_and_classification_code_instruction()
    {
        var scheme = new DeweyPublicDomainScheme();
        var prompt = ClassificationPromptBuilder.BuildSingleShotSchemePrompt(scheme);

        Assert.That(prompt, Does.Contain("classificationCode"));
        Assert.That(prompt, Does.Contain("770|Photography"));
        Assert.That(prompt, Does.Contain(scheme.Name));
    }

    [Test]
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

        Assert.That(prompt, Does.Contain("385|Railroad Transportation"));
        Assert.That(prompt, Does.Contain("388|Transportation"));
        Assert.That(prompt, Does.Not.Contain("590|Zoology"));
        Assert.That(prompt, Does.Not.Contain("770|Photography"));
    }
}
