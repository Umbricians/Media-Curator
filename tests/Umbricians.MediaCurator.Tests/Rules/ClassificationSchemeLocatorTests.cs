using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Rules;

public class ClassificationSchemeLocatorTests
{
    private static RuleNode Classification(params (string Key, string Value)[] settings)
        => new() { ProviderAlias = ClassificationProvider.ProviderAlias, Settings = TestContext.Settings(settings) };

    private static RuleNode Date(params RuleNode[] children)
        => new() { ProviderAlias = DateFolderProvider.ProviderAlias, Children = [.. children] };

    [Fact]
    public void Uses_the_scheme_of_the_first_classification_rule()
        => Assert.Equal("dewey-pd", ClassificationSchemeLocator.FindScheme(
            [Date(), Classification(("scheme", "dewey-pd")), Classification(("scheme", "lcc"))]));

    [Fact]
    public void Finds_rules_nested_under_others()
        => Assert.Equal("dewey-pd", ClassificationSchemeLocator.FindScheme([Date(Classification(("scheme", "dewey-pd")))]));

    [Fact]
    public void A_rule_without_a_scheme_uses_the_rules_default()
        => Assert.Equal(ClassificationProvider.DefaultScheme, ClassificationSchemeLocator.FindScheme([Classification()]));

    [Fact]
    public void Rules_that_need_no_ai_are_skipped()
    {
        Assert.Null(ClassificationSchemeLocator.FindScheme([Classification(("scheme", "lcc"), ("source", "filename"))]));
        Assert.Null(ClassificationSchemeLocator.FindScheme([Classification(("scheme", "custom"))]));
        Assert.Equal("lcc", ClassificationSchemeLocator.FindScheme(
            [Classification(("scheme", "custom")), Classification(("scheme", "lcc"))]));
    }

    [Fact]
    public void No_classification_rule_means_no_scheme()
        => Assert.Null(ClassificationSchemeLocator.FindScheme([Date()]));
}
