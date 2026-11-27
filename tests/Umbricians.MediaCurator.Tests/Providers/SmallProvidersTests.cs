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

    [Theory]
    [InlineData(800, 400, "Landscape")]
    [InlineData(400, 800, "Portrait")]
    [InlineData(500, 500, "Square")]
    [InlineData(500, 510, "Square")] // within 5% tolerance
    public async Task Dimensions_buckets_by_orientation(int w, int h, string expected)
    {
        var result = await Dimensions().ResolveAsync(WithImage(TestContext.Create(), w, h));

        Assert.Equal(expected, result.ResolvedValue);
    }

    // A camera held upright often stores the photo sideways with an EXIF orientation that turns it upright (6 and 8
    // turn it a quarter), so it is sorted as it is shown.
    [Theory]
    [InlineData((ushort)1, "Landscape")]
    [InlineData((ushort)6, "Portrait")]
    [InlineData((ushort)8, "Portrait")]
    public async Task Dimensions_follow_the_EXIF_orientation(ushort orientation, string expected)
    {
        var result = await Dimensions().ResolveAsync(WithImage(TestContext.Create(), 800, 400, orientation));

        Assert.Equal(expected, result.ResolvedValue);
    }

    [Fact]
    public async Task Dimensions_unresolved_for_a_file_that_isnt_an_image()
    {
        var context = TestContext.Create() with { OpenFile = () => new MemoryStream("not an image"u8.ToArray()) };

        Assert.False((await Dimensions().ResolveAsync(context)).IsResolved);
    }

    [Theory]
    [InlineData("photo.JPG", "Photos")]
    [InlineData("icon.png", "PNG")]
    [InlineData("logo.svg", "Vectors")]
    [InlineData("anim.gif", "Animated")]
    [InlineData("modern.webp", "Modern")]
    [InlineData("file.tiff", "Other")]
    public async Task Format_groups_by_extension(string name, string expected)
    {
        var result = await new ImageFormatProvider().ResolveAsync(TestContext.Create(name: name));

        Assert.Equal(expected, Assert.Single(result.Segments).Name);
    }

    [Fact]
    public async Task Format_unresolved_without_extension()
    {
        Assert.False((await new ImageFormatProvider().ResolveAsync(TestContext.Create(name: "noext"))).IsResolved);
    }

    [Theory]
    [InlineData("PROJ-1234_hero.jpg", "PROJ-1234")]
    [InlineData("ABC-9 photo", "ABC-9")]
    public async Task Filename_convention_extracts_capture_group(string name, string expected)
    {
        var result = await new FilenameConventionProvider().ResolveAsync(TestContext.Create(name: name));

        Assert.Equal(expected, result.ResolvedValue);
    }

    [Fact]
    public async Task Filename_convention_handles_no_match_and_bad_pattern()
    {
        var provider = new FilenameConventionProvider();

        var noMatch = await provider.ResolveAsync(TestContext.Create(name: "plain.jpg"));
        var badPattern = await provider.ResolveAsync(
            TestContext.Create(name: "x", settings: TestContext.Settings(("pattern", "[unclosed"))));

        Assert.False(noMatch.IsResolved);
        Assert.False(badPattern.IsResolved);
    }
}
