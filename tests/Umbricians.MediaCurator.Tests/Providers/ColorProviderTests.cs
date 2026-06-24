using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class ColorProviderTests
{
    private readonly ColorProvider _sut = new();

    private static CurationContext WithImage(CurationContext ctx, Rgb24 fill, int w = 8, int h = 8)
        => ctx with
        {
            OpenFile = () =>
            {
                var stream = new MemoryStream();
                using (var image = new Image<Rgb24>(w, h, fill))
                {
                    image.SaveAsPng(stream);
                }

                stream.Position = 0;
                return stream;
            },
        };

    [Theory]
    [InlineData(255, 0, 0, "Red")]
    [InlineData(0, 0, 255, "Blue")]
    [InlineData(250, 250, 250, "White")]
    [InlineData(10, 10, 10, "Black")]
    public async Task Snaps_solid_color_image_to_nearest_palette_entry(byte r, byte g, byte b, string expected)
    {
        var ctx = WithImage(TestContext.Create(), new Rgb24(r, g, b));

        var result = await _sut.ResolveAsync(ctx);

        Assert.True(result.IsResolved);
        Assert.Equal(expected, result.ResolvedValue);
    }

    [Fact]
    public async Task Custom_brand_palette_names_are_used()
    {
        var ctx = WithImage(
            TestContext.Create(settings: TestContext.Settings(("palette", "Brand Blue=#1B264F\nBrand Sand=#E9DCC9"))),
            new Rgb24(27, 38, 79));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Brand Blue", result.ResolvedValue);
    }

    [Fact]
    public async Task Average_mode_resolves()
    {
        var ctx = WithImage(
            TestContext.Create(settings: TestContext.Settings(("mode", "average"))),
            new Rgb24(0, 128, 0));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Green", result.ResolvedValue);
    }

    [Fact]
    public async Task Unresolved_for_missing_or_invalid_file()
    {
        var noFile = await _sut.ResolveAsync(TestContext.Create());
        var nullStream = await _sut.ResolveAsync(TestContext.Create() with { OpenFile = () => null });
        var garbage = await _sut.ResolveAsync(TestContext.Create() with
        {
            OpenFile = () => new MemoryStream([1, 2, 3, 4]),
        });

        Assert.False(noFile.IsResolved);
        Assert.False(nullStream.IsResolved);
        Assert.False(garbage.IsResolved);
    }

    [Fact]
    public void Palette_parsing_skips_malformed_lines()
    {
        var palette = ColorProvider.ParsePalette("Red=#FF0000\nnope\nBad=#XYZ\n=#000000\nBlue=#0000FF");

        Assert.Equal(2, palette.Count);
        Assert.Equal(["Red", "Blue"], palette.Select(p => p.Name));
    }
}
