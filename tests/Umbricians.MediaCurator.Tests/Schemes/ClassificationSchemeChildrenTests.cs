using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Schemes;

public class ClassificationSchemeChildrenTests
{
    [Test]
    public void Dewey_roots_return_ten_main_classes()
    {
        var scheme = new DeweyPublicDomainScheme();
        var roots = scheme.GetChildren(null);

        Assert.That(roots.Count, Is.EqualTo(10));
        Assert.That(roots.Any(e => e.Code == "300" && e.Name == "Sociology"), Is.True);
    }

    [Test]
    public void Dewey_children_under_380_include_railroad_transportation()
    {
        var scheme = new DeweyPublicDomainScheme();
        var children = scheme.GetChildren("380");

        Assert.That(children.Any(e => e.Code == "385" && e.Name == "Railroad Transportation"), Is.True);
        Assert.That(children.Any(e => e.Code == "388" && e.Name == "Transportation"), Is.True);
    }
}
