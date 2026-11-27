using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Metadata.Profiles.Exif;
using SixLabors.ImageSharp.PixelFormats;
using Umbraco.Cms.Imaging.ImageSharp.Media;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class SmallProvidersTests
{
    // The extractor a site uses, from Umbraco.Cms.Imaging.ImageSharp.
    private static DimensionsProvider Dimensions() => new(new ImageSharpDimensionExtractor(SixLabors.ImageSharp.Configuration.Default));

    private static CurationContext WithImage(CurationContext ctx, int w, int h, ushort? exifOrientation = null)
        => ctx with
        {
            OpenFile = () =>
            {
                var stream = new MemoryStream();
                using (var image = new Image<Rgb24>(w, h, new Rgb24(1, 2, 3)))
                {
                    if (exifOrientation is { } orientation)
                    {
                        image.Metadata.ExifProfile = new ExifProfile();
                        image.Metadata.ExifProfile.SetValue(ExifTag.Orientation, orientation);
                        image.SaveAsJpeg(stream);
                    }
                    else
                    {
                        image.SaveAsPng(stream);
                    }
                }

                stream.Position = 0;
                return stream;
            },
        };

    [TestCase(800, 400, "Landscape")]
    [TestCase(400, 800, "Portrait")]
    [TestCase(500, 500, "Square")]
    [TestCase(500, 510, "Square")] // within 5% tolerance
    public async Task Dimensions_buckets_by_orientation(int w, int h, string expected)
    {
        var result = await Dimensions().ResolveAsync(WithImage(CurationContexts.Create(), w, h));

        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
    }

    // A camera held upright often stores the photo sideways with an EXIF orientation that turns it upright (6 and 8
    // turn it a quarter), so it is sorted as it is shown.
    [TestCase((ushort)1, "Landscape")]
    [TestCase((ushort)6, "Portrait")]
    [TestCase((ushort)8, "Portrait")]
    public async Task Dimensions_follow_the_EXIF_orientation(ushort orientation, string expected)
    {
        var result = await Dimensions().ResolveAsync(WithImage(CurationContexts.Create(), 800, 400, orientation));

        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
    }

    [Test]
    public async Task Dimensions_unresolved_for_a_file_that_isnt_an_image()
    {
        var context = CurationContexts.Create() with { OpenFile = () => new MemoryStream("not an image"u8.ToArray()) };

        Assert.That((await Dimensions().ResolveAsync(context)).IsResolved, Is.False);
    }

    [TestCase("photo.JPG", "Photos")]
    [TestCase("icon.png", "PNG")]
    [TestCase("logo.svg", "Vectors")]
    [TestCase("anim.gif", "Animated")]
    [TestCase("modern.webp", "Modern")]
    [TestCase("file.tiff", "Other")]
    public async Task Format_groups_by_extension(string name, string expected)
    {
        var result = await new ImageFormatProvider().ResolveAsync(CurationContexts.Create(name: name));

        Assert.That(TestAssert.Single(result.Segments).Name, Is.EqualTo(expected));
    }

    [Test]
    public async Task Format_unresolved_without_extension()
    {
        Assert.That((await new ImageFormatProvider().ResolveAsync(CurationContexts.Create(name: "noext"))).IsResolved, Is.False);
    }

    [TestCase("PROJ-1234_hero.jpg", "PROJ-1234")]
    [TestCase("ABC-9 photo", "ABC-9")]
    public async Task Filename_convention_extracts_capture_group(string name, string expected)
    {
        var result = await new FilenameConventionProvider().ResolveAsync(CurationContexts.Create(name: name));

        Assert.That(result.ResolvedValue, Is.EqualTo(expected));
    }

    [Test]
    public async Task Filename_convention_handles_no_match_and_bad_pattern()
    {
        var provider = new FilenameConventionProvider();

        var noMatch = await provider.ResolveAsync(CurationContexts.Create(name: "plain.jpg"));
        var badPattern = await provider.ResolveAsync(
            CurationContexts.Create(name: "x", settings: CurationContexts.Settings(("pattern", "[unclosed"))));

        Assert.That(noMatch.IsResolved, Is.False);
        Assert.That(badPattern.IsResolved, Is.False);
    }
}
