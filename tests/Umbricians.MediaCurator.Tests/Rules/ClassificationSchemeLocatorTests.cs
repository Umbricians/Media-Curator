using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Rules;

public class ClassificationSchemeLocatorTests
{
    private static RuleNode Classification(params (string Key, string Value)[] settings)
        => new() { ProviderAlias = ClassificationProvider.ProviderAlias, Settings = CurationContexts.Settings(settings) };

    private static RuleNode Date(params RuleNode[] children)
        => new() { ProviderAlias = DateFolderProvider.ProviderAlias, Children = [.. children] };

    [Test]
    public void Uses_the_scheme_of_the_first_classification_rule()
        => Assert.That(ClassificationSchemeLocator.FindScheme(
            [Date(), Classification(("scheme", "dewey-pd")), Classification(("scheme", "lcc"))]), Is.EqualTo("dewey-pd"));

    [Test]
    public void Finds_rules_nested_under_others()
        => Assert.That(ClassificationSchemeLocator.FindScheme([Date(Classification(("scheme", "dewey-pd")))]), Is.EqualTo("dewey-pd"));

    [Test]
    public void A_rule_without_a_scheme_uses_the_rules_default()
        => Assert.That(ClassificationSchemeLocator.FindScheme([Classification()]), Is.EqualTo(ClassificationProvider.DefaultScheme));

    [Test]
    public void Rules_that_need_no_ai_are_skipped()
    {
        Assert.That(ClassificationSchemeLocator.FindScheme([Classification(("scheme", "lcc"), ("source", "filename"))]), Is.Null);
        Assert.That(ClassificationSchemeLocator.FindScheme([Classification(("scheme", "custom"))]), Is.Null);
        Assert.That(ClassificationSchemeLocator.FindScheme(
            [Classification(("scheme", "custom")), Classification(("scheme", "lcc"))]), Is.EqualTo("lcc"));
    }

    [Test]
    public void No_classification_rule_means_no_scheme()
        => Assert.That(ClassificationSchemeLocator.FindScheme([Date()]), Is.Null);
}
