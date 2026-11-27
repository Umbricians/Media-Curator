using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class ExifValueProviderTests
{
    private readonly ExifValueProvider _sut = new();

    private static Dictionary<string, string> Exif(params (string K, string V)[] pairs)
        => pairs.ToDictionary(p => p.K, p => p.V, StringComparer.OrdinalIgnoreCase);

    [Test]
    public async Task Resolves_configured_tag_value_as_segment()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("tag", "Model")))
            with { Exif = Exif(("Make", "Nikon"), ("Model", "Z 8")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.ResolvedValue, Is.EqualTo("Z 8"));
    }

    [Test]
    public async Task Defaults_to_camera_make()
    {
        var ctx = CurationContexts.Create() with { Exif = Exif(("Make", "Canon")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Canon"));
    }

    [Test]
    public async Task Applies_value_mappings()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(
                ("tag", "Make"),
                ("mappings", "NIKON CORPORATION=Nikon\nCANON INC.=Canon")))
            with { Exif = Exif(("Make", "NIKON CORPORATION")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Nikon"));
    }

    [Test]
    public async Task Unmapped_values_pass_through_raw()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("mappings", "X=Y")))
            with { Exif = Exif(("Make", "Sony")) };

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Sony"));
    }

    [Test]
    public async Task Unresolved_when_tag_absent_or_no_exif()
    {
        var noExif = await _sut.ResolveAsync(CurationContexts.Create());
        var missingTag = await _sut.ResolveAsync(
            CurationContexts.Create(settings: CurationContexts.Settings(("tag", "LensModel")))
                with { Exif = Exif(("Make", "Nikon")) });

        Assert.That(noExif.IsResolved, Is.False);
        Assert.That(missingTag.IsResolved, Is.False);
    }

    [Test]
    public void Declares_optional_exif_cache_property_requirement()
    {
        var requirement = TestAssert.Single(_sut.Requirements);

        Assert.That(requirement.Alias, Is.EqualTo(ExifValueProvider.ExifDataPropertyAlias));
        Assert.That(requirement.Mandatory, Is.False);
    }
}
