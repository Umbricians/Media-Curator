using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class DateFolderProviderTests
{
    private readonly DateFolderProvider _sut = new();

    [TestCase("yyyy/MM", new[] { "2026", "06" })]
    [TestCase("yyyy/MM/dd", new[] { "2026", "06", "10" })]
    [TestCase("yy/MM", new[] { "26", "06" })]
    [TestCase("yyyy", new[] { "2026" })]
    public async Task Formats_create_date_into_segments(string format, string[] expected)
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("format", format)));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(expected));
    }

    [Test]
    public async Task Defaults_to_yyyy_MM_when_no_format_configured()
    {
        var result = await _sut.ResolveAsync(CurationContexts.Create());

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "06"]));
        Assert.That(result.ResolvedValue, Is.EqualTo("2026/06"));
    }

    [Test]
    public async Task Localizes_month_names_to_ruleset_culture()
    {
        var ctx = CurationContexts.Create(culture: "da-DK", settings: CurationContexts.Settings(("format", "yyyy/MMMM")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments[1].Name, Is.EqualTo("juni"));
    }

    [Test]
    public async Task Uses_update_date_when_configured()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("format", "yyyy/MM"), ("source", "updateDate")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "07"]));
    }

    [Test]
    public async Task Unresolved_when_date_is_missing()
    {
        var ctx = CurationContexts.Create(createDate: default(DateTime));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.False);
    }
}
