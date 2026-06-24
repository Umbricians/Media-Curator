using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Schemes;

public class ClassificationSchemeChildrenTests
{
    [Fact]
    public void Dewey_roots_return_ten_main_classes()
    {
        var scheme = new DeweyPublicDomainScheme();
        var roots = scheme.GetChildren(null);

        Assert.Equal(10, roots.Count);
        Assert.Contains(roots, e => e.Code == "300" && e.Name == "Sociology");
    }

    [Fact]
    public void Dewey_children_under_380_include_railroad_transportation()
    {
        var scheme = new DeweyPublicDomainScheme();
        var children = scheme.GetChildren("380");

        Assert.Contains(children, e => e.Code == "385" && e.Name == "Railroad Transportation");
        Assert.Contains(children, e => e.Code == "388" && e.Name == "Transportation");
    }
}
