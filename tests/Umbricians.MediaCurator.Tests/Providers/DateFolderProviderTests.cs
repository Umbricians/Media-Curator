using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class DateFolderProviderTests
{
    private readonly DateFolderProvider _sut = new();

    [Theory]
    [InlineData("yyyy/MM", new[] { "2026", "06" })]
    [InlineData("yyyy/MM/dd", new[] { "2026", "06", "10" })]
    [InlineData("yy/MM", new[] { "26", "06" })]
    [InlineData("yyyy", new[] { "2026" })]
    public async Task Formats_create_date_into_segments(string format, string[] expected)
    {
        var ctx = TestContext.Create(settings: TestContext.Settings(("format", format)));

        var result = await _sut.ResolveAsync(ctx);

        Assert.True(result.IsResolved);
        Assert.Equal(expected, result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Defaults_to_yyyy_MM_when_no_format_configured()
    {
        var result = await _sut.ResolveAsync(TestContext.Create());

        Assert.True(result.IsResolved);
        Assert.Equal(["2026", "06"], result.Segments.Select(s => s.Name));
        Assert.Equal("2026/06", result.ResolvedValue);
    }

    [Fact]
    public async Task Localizes_month_names_to_ruleset_culture()
    {
        var ctx = TestContext.Create(culture: "da-DK", settings: TestContext.Settings(("format", "yyyy/MMMM")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.True(result.IsResolved);
        Assert.Equal("juni", result.Segments[1].Name);
    }

    [Fact]
    public async Task Uses_update_date_when_configured()
    {
        var ctx = TestContext.Create(settings: TestContext.Settings(("format", "yyyy/MM"), ("source", "updateDate")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal(["2026", "07"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Unresolved_when_date_is_missing()
    {
        var ctx = TestContext.Create(createDate: default(DateTime));

        var result = await _sut.ResolveAsync(ctx);

        Assert.False(result.IsResolved);
    }
}
