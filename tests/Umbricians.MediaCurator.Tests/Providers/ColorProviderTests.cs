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

    private static CurationContext WithImage(CurationContext ctx, Action<Image<Rgb24>> paint, int w = 64, int h = 64)
        => ctx with
        {
            OpenFile = () =>
            {
                var stream = new MemoryStream();
                using (var image = new Image<Rgb24>(w, h))
                {
                    paint(image);
                    image.SaveAsPng(stream);
                }

                stream.Position = 0;
                return stream;
            },
        };

    private static CurationContext WithFile(CurationContext ctx, string relativePath)
    {
        var path = ResolveWorkspaceFile(relativePath);
        return ctx with { OpenFile = () => File.OpenRead(path) };
    }

    private static string ResolveWorkspaceFile(string relativePath)
    {
        for (var directory = new DirectoryInfo(AppContext.BaseDirectory); directory is not null; directory = directory.Parent)
        {
            var candidate = Path.Combine(directory.FullName, relativePath);
            if (File.Exists(candidate))
            {
                return candidate;
            }
        }

        throw new FileNotFoundException(relativePath);
    }

    /// <summary>Fills the lower-left triangle with <paramref name="background"/> and the rest
    /// with a vertical gradient between two colors.</summary>
    private static Action<Image<Rgb24>> DiagonalOver(Rgb24 background, Rgb24 from, Rgb24 to) => image =>
    {
        for (var y = 0; y < image.Height; y++)
        {
            var t = y / (float)(image.Height - 1);
            var gradient = new Rgb24(
                (byte)(from.R + ((to.R - from.R) * t)),
                (byte)(from.G + ((to.G - from.G) * t)),
                (byte)(from.B + ((to.B - from.B) * t)));
            for (var x = 0; x < image.Width; x++)
            {
                image[x, y] = x < y ? background : gradient;
            }
        }
    };

    // Regression: a blue gradient over a black background (about half the pixels are near-black,
    // the blues are dark navies) was filed under Black.
    [Fact]
    public async Task Blue_gradient_on_black_photo_is_blue()
    {
        var ctx = WithFile(TestContext.Create(), "tests/images/blue-gradient-on-black.jpg");

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Blue", result.ResolvedValue);
    }

    [Fact]
    public async Task Colored_subject_beats_a_larger_dark_background()
    {
        var ctx = WithImage(TestContext.Create(), DiagonalOver(new Rgb24(0, 0, 0), new Rgb24(0, 20, 90), new Rgb24(0, 120, 200)));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Blue", result.ResolvedValue);
    }

    [Fact]
    public async Task Mostly_black_image_with_a_small_colored_detail_stays_black()
    {
        var ctx = WithImage(TestContext.Create(), image =>
        {
            for (var y = 0; y < image.Height; y++)
            {
                for (var x = 0; x < image.Width; x++)
                {
                    image[x, y] = x < 6 && y < 32 ? new Rgb24(0, 0, 255) : new Rgb24(5, 5, 5);
                }
            }
        });

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Black", result.ResolvedValue);
    }

    [Theory]
    [InlineData(0, 45, 106, "Blue")] // dark navy, previously Black
    [InlineData(0, 90, 200, "Blue")] // mid blue
    [InlineData(0, 128, 170, "Cyan")] // teal (hue ~195°), previously Gray
    [InlineData(0, 70, 0, "Green")] // dark green
    [InlineData(128, 128, 128, "Gray")]
    [InlineData(240, 240, 245, "White")]
    [InlineData(255, 182, 193, "Pink")]
    [InlineData(139, 69, 19, "Brown")]
    [InlineData(255, 165, 0, "Orange")]
    [InlineData(128, 0, 128, "Purple")]
    [InlineData(0, 230, 230, "Cyan")]
    public async Task Classifies_colors_by_hue_not_brightness(byte r, byte g, byte b, string expected)
    {
        var ctx = WithImage(TestContext.Create(), new Rgb24(r, g, b));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal(expected, result.ResolvedValue);
    }

    [Fact]
    public async Task Average_mode_uses_hue_classification_too()
    {
        var ctx = WithImage(TestContext.Create(settings: TestContext.Settings(("mode", "average"))), new Rgb24(0, 45, 106));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Blue", result.ResolvedValue);
    }

    [Fact]
    public async Task Palette_without_neutral_entries_still_resolves_dark_pixels()
    {
        var ctx = WithImage(
            TestContext.Create(settings: TestContext.Settings(("palette", "Brand Blue=#1B264F\nBrand Red=#C8102E"))),
            new Rgb24(5, 5, 5));

        var result = await _sut.ResolveAsync(ctx);

        Assert.True(result.IsResolved);
    }

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
