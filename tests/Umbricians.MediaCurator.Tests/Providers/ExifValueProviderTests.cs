using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class ExifValueProviderTests
{
    private readonly ExifValueProvider _sut = new();

    private static Dictionary<string, string> Exif(params (string K, string V)[] pairs)
        => pairs.ToDictionary(p => p.K, p => p.V, StringComparer.OrdinalIgnoreCase);

    [Fact]
    public async Task Resolves_configured_tag_value_as_segment()
    {
        var ctx = TestContext.Create(settings: TestContext.Settings(("tag", "Model")))
            with { Exif = Exif(("Make", "Nikon"), ("Model", "Z 8")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.True(result.IsResolved);
        Assert.Equal("Z 8", result.ResolvedValue);
    }

    [Fact]
    public async Task Defaults_to_camera_make()
    {
        var ctx = TestContext.Create() with { Exif = Exif(("Make", "Canon")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Canon", result.ResolvedValue);
    }

    [Fact]
    public async Task Applies_value_mappings()
    {
        var ctx = TestContext.Create(settings: TestContext.Settings(
                ("tag", "Make"),
                ("mappings", "NIKON CORPORATION=Nikon\nCANON INC.=Canon")))
            with { Exif = Exif(("Make", "NIKON CORPORATION")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Nikon", result.ResolvedValue);
    }

    [Fact]
    public async Task Unmapped_values_pass_through_raw()
    {
        var ctx = TestContext.Create(settings: TestContext.Settings(("mappings", "X=Y")))
            with { Exif = Exif(("Make", "Sony")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Sony", result.ResolvedValue);
    }

    [Fact]
    public async Task Unresolved_when_tag_absent_or_no_exif()
    {
        var noExif = await _sut.ResolveAsync(TestContext.Create());
        var missingTag = await _sut.ResolveAsync(
            TestContext.Create(settings: TestContext.Settings(("tag", "LensModel")))
                with { Exif = Exif(("Make", "Nikon")) });

        Assert.False(noExif.IsResolved);
        Assert.False(missingTag.IsResolved);
    }

    [Fact]
    public void Declares_optional_exif_cache_property_requirement()
    {
        var requirement = Assert.Single(_sut.Requirements);

        Assert.Equal(ExifValueProvider.ExifDataPropertyAlias, requirement.Alias);
        Assert.False(requirement.Mandatory);
    }
}
