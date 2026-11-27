using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class AlphabeticalProviderTests
{
    private readonly AlphabeticalProvider _sut = new();

    [TestCase("apple.jpg", "A")]
    [TestCase("Zebra", "Z")]
    [TestCase("  banana", "B")]
    public async Task Buckets_by_first_letter_uppercased(string name, string expected)
    {
        var result = await _sut.ResolveAsync(CurationContexts.Create(name: name));

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
        Assert.That(TestAssert.Single(result.Segments).Name, Is.EqualTo(expected));
    }

    [TestCase("123 photo")]
    [TestCase("_underscore")]
    public async Task Non_letter_names_go_to_other_bucket(string name)
    {
        var result = await _sut.ResolveAsync(CurationContexts.Create(name: name));

        Assert.That(result.ResolvedValue, Is.EqualTo("#"));
    }

    [Test]
    public async Task Other_bucket_name_is_configurable()
    {
        var ctx = CurationContexts.Create(name: "42.png", settings: CurationContexts.Settings(("otherBucket", "Misc")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Misc"));
    }

    [Test]
    public async Task Unresolved_for_empty_name()
    {
        var result = await _sut.ResolveAsync(CurationContexts.Create(name: "  "));

        Assert.That(result.IsResolved, Is.False);
    }
}
