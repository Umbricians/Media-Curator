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
    [Test]
    public async Task Blue_gradient_on_black_photo_is_blue()
    {
        var ctx = WithFile(CurationContexts.Create(), "tests/images/blue-gradient-on-black.jpg");

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Blue"));
    }

    [Test]
    public async Task Colored_subject_beats_a_larger_dark_background()
    {
        var ctx = WithImage(CurationContexts.Create(), DiagonalOver(new Rgb24(0, 0, 0), new Rgb24(0, 20, 90), new Rgb24(0, 120, 200)));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Blue"));
    }

    [Test]
    public async Task Mostly_black_image_with_a_small_colored_detail_stays_black()
    {
        var ctx = WithImage(CurationContexts.Create(), image =>
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

        Assert.That(result.ResolvedValue, Is.EqualTo("Black"));
    }

    [TestCase(0, 45, 106, "Blue")] // dark navy, previously Black
    [TestCase(0, 90, 200, "Blue")] // mid blue
    [TestCase(0, 128, 170, "Cyan")] // teal (hue ~195°), previously Gray
    [TestCase(0, 70, 0, "Green")] // dark green
    [TestCase(128, 128, 128, "Gray")]
    [TestCase(240, 240, 245, "White")]
    [TestCase(255, 182, 193, "Pink")]
    [TestCase(139, 69, 19, "Brown")]
    [TestCase(255, 165, 0, "Orange")]
    [TestCase(128, 0, 128, "Purple")]
    [TestCase(0, 230, 230, "Cyan")]
    public async Task Classifies_colors_by_hue_not_brightness(byte r, byte g, byte b, string expected)
    {
        var ctx = WithImage(CurationContexts.Create(), new Rgb24(r, g, b));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
    }

    [Test]
    public async Task Average_mode_uses_hue_classification_too()
    {
        var ctx = WithImage(CurationContexts.Create(settings: CurationContexts.Settings(("mode", "average"))), new Rgb24(0, 45, 106));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Blue"));
    }

    [Test]
    public async Task Palette_without_neutral_entries_still_resolves_dark_pixels()
    {
        var ctx = WithImage(
            CurationContexts.Create(settings: CurationContexts.Settings(("palette", "Brand Blue=#1B264F\nBrand Red=#C8102E"))),
            new Rgb24(5, 5, 5));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
    }

    [TestCase(255, 0, 0, "Red")]
    [TestCase(0, 0, 255, "Blue")]
    [TestCase(250, 250, 250, "White")]
    [TestCase(10, 10, 10, "Black")]
    public async Task Snaps_solid_color_image_to_nearest_palette_entry(byte r, byte g, byte b, string expected)
    {
        var ctx = WithImage(CurationContexts.Create(), new Rgb24(r, g, b));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
    }

    [Test]
    public async Task Custom_brand_palette_names_are_used()
    {
        var ctx = WithImage(
            CurationContexts.Create(settings: CurationContexts.Settings(("palette", "Brand Blue=#1B264F\nBrand Sand=#E9DCC9"))),
            new Rgb24(27, 38, 79));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Brand Blue"));
    }

    [Test]
    public async Task Average_mode_resolves()
    {
        var ctx = WithImage(
            CurationContexts.Create(settings: CurationContexts.Settings(("mode", "average"))),
            new Rgb24(0, 128, 0));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("Green"));
    }

    [Test]
    public async Task Unresolved_for_missing_or_invalid_file()
    {
        var noFile = await _sut.ResolveAsync(CurationContexts.Create());
        var nullStream = await _sut.ResolveAsync(CurationContexts.Create() with { OpenFile = () => null });
        var garbage = await _sut.ResolveAsync(CurationContexts.Create() with
        {
            OpenFile = () => new MemoryStream([1, 2, 3, 4]),
        });

        Assert.That(noFile.IsResolved, Is.False);
        Assert.That(nullStream.IsResolved, Is.False);
        Assert.That(garbage.IsResolved, Is.False);
    }

    [Test]
    public void Palette_parsing_skips_malformed_lines()
    {
        var palette = ColorProvider.ParsePalette("Red=#FF0000\nnope\nBad=#XYZ\n=#000000\nBlue=#0000FF");

        Assert.That(palette.Count, Is.EqualTo(2));
        Assert.That(palette.Select(p => p.Name), Is.EqualTo(["Red", "Blue"]));
    }
}
