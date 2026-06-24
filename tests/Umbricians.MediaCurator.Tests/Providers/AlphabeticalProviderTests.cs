using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class AlphabeticalProviderTests
{
    private readonly AlphabeticalProvider _sut = new();

    [Theory]
    [InlineData("apple.jpg", "A")]
    [InlineData("Zebra", "Z")]
    [InlineData("  banana", "B")]
    public async Task Buckets_by_first_letter_uppercased(string name, string expected)
    {
        var result = await _sut.ResolveAsync(TestContext.Create(name: name));

        Assert.True(result.IsResolved);
        Assert.Equal(expected, result.ResolvedValue);
        Assert.Equal(expected, Assert.Single(result.Segments).Name);
    }

    [Theory]
    [InlineData("123 photo")]
    [InlineData("_underscore")]
    public async Task Non_letter_names_go_to_other_bucket(string name)
    {
        var result = await _sut.ResolveAsync(TestContext.Create(name: name));

        Assert.Equal("#", result.ResolvedValue);
    }

    [Fact]
    public async Task Other_bucket_name_is_configurable()
    {
        var ctx = TestContext.Create(name: "42.png", settings: TestContext.Settings(("otherBucket", "Misc")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Misc", result.ResolvedValue);
    }

    [Fact]
    public async Task Unresolved_for_empty_name()
    {
        var result = await _sut.ResolveAsync(TestContext.Create(name: "  "));

        Assert.False(result.IsResolved);
    }
}
