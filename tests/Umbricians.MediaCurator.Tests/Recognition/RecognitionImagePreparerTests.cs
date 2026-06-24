using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using Umbricians.MediaCurator.Recognition;

namespace Umbricians.MediaCurator.Tests.Recognition;

public class RecognitionImagePreparerTests
{
    private const string TestPizzaPath = "tests/images/test-pizza.jpg";

    private static byte[] CreatePng(int width, int height)
    {
        using var image = new Image<Rgb24>(width, height);
        using var stream = new MemoryStream();
        image.SaveAsPng(stream);
        return stream.ToArray();
    }

    private static byte[] CreateTransparentPngWithHiddenGreenPixels(int width, int height)
    {
        using var image = new Image<Rgba32>(width, height, new Rgba32(0, 255, 0, 0));
        using var stream = new MemoryStream();
        image.SaveAsPng(stream);
        return stream.ToArray();
    }

    private static string ResolveWorkspaceFile(string relativePath)
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, relativePath);
            if (File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException($"Could not resolve workspace file '{relativePath}'.");
    }

    private static double AverageGreenDominance(Image<Rgb24> image)
    {
        long red = 0;
        long green = 0;
        long blue = 0;
        var count = image.Width * image.Height;

        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
            {
                var row = accessor.GetRowSpan(y);
                foreach (var pixel in row)
                {
                    red += pixel.R;
                    green += pixel.G;
                    blue += pixel.B;
                }
            }
        });

        return (green - ((red + blue) / 2.0)) / count;
    }

    private static double AverageAdjacentRowLuminanceDelta(Image<Rgb24> image)
    {
        var previous = 0.0;
        var totalDelta = 0.0;

        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
            {
                var row = accessor.GetRowSpan(y);
                var luminance = 0.0;
                foreach (var pixel in row)
                {
                    luminance += (0.2126 * pixel.R) + (0.7152 * pixel.G) + (0.0722 * pixel.B);
                }

                luminance /= row.Length;
                if (y > 0)
                {
                    totalDelta += Math.Abs(luminance - previous);
                }

                previous = luminance;
            }
        });

        return totalDelta / Math.Max(1, image.Height - 1);
    }

    [Fact]
    public void Prepare_downscales_when_longest_edge_exceeds_limit()
    {
        var original = CreatePng(2400, 1200);

        var (bytes, mediaType) = RecognitionImagePreparer.Prepare(original, "image/png", maxEdgePixels: 1024);

        Assert.Equal("image/jpeg", mediaType);
        Assert.True(bytes.Length < original.Length);
        using var resized = Image.Load(bytes);
        Assert.Equal(1024, Math.Max(resized.Width, resized.Height));
        Assert.Equal(512, Math.Min(resized.Width, resized.Height));
    }

    [Fact]
    public void Prepare_leaves_small_images_unchanged()
    {
        var original = CreatePng(800, 600);

        var (bytes, mediaType) = RecognitionImagePreparer.Prepare(original, "image/png", maxEdgePixels: 1024);

        Assert.Same(original, bytes);
        Assert.Equal("image/png", mediaType);
    }

    [Fact]
    public void Prepare_with_zero_limit_sends_original_bytes()
    {
        var original = CreatePng(2400, 1200);

        var (bytes, mediaType) = RecognitionImagePreparer.Prepare(original, "image/png", maxEdgePixels: 0);

        Assert.Same(original, bytes);
        Assert.Equal("image/png", mediaType);
    }

    [Fact]
    public void Prepare_writes_prepared_image_to_test_folder_when_configured()
    {
        var original = CreatePng(2400, 1200);
        var outputDir = Path.Combine(Path.GetTempPath(), "mc-preparer-test", Guid.NewGuid().ToString("N"));

        try
        {
            var (bytes, mediaType) = RecognitionImagePreparer.Prepare(
                original,
                "image/png",
                maxEdgePixels: 1024,
                testOutputFolder: outputDir,
                fileLabel: "pizza");

            Assert.Equal("image/jpeg", mediaType);
            var written = Directory.GetFiles(outputDir, "*_pizza_prepared_*.jpg");
            Assert.Single(written);
            Assert.Equal(bytes, File.ReadAllBytes(written[0]));
        }
        finally
        {
            if (Directory.Exists(outputDir))
            {
                Directory.Delete(outputDir, recursive: true);
            }
        }
    }

    [Fact]
    public void Prepare_flattens_transparency_before_jpeg_encoding()
    {
        var original = CreateTransparentPngWithHiddenGreenPixels(2400, 1200);

        var (bytes, mediaType) = RecognitionImagePreparer.Prepare(original, "image/png", maxEdgePixels: 1024);

        Assert.Equal("image/jpeg", mediaType);
        using var prepared = Image.Load<Rgb24>(bytes);
        var center = prepared[prepared.Width / 2, prepared.Height / 2];
        Assert.True(center.R > 240);
        Assert.True(center.G > 240);
        Assert.True(center.B > 240);
    }

    [Fact]
    public void Prepare_resizes_test_pizza_to_standard_jpeg()
    {
        var original = File.ReadAllBytes(ResolveWorkspaceFile(TestPizzaPath));

        var (bytes, mediaType) = RecognitionImagePreparer.Prepare(original, "image/jpeg", maxEdgePixels: 512);

        Assert.Equal("image/jpeg", mediaType);
        Assert.NotSame(original, bytes);
        using var prepared = Image.Load<Rgb24>(bytes);
        Assert.Equal(512, Math.Max(prepared.Width, prepared.Height));
        Assert.True(Math.Abs((847 / 1024.0) - (prepared.Width / (double)prepared.Height)) < 0.01);
    }

    [Fact]
    public void Prepare_keeps_test_pizza_visually_plausible_after_resize()
    {
        var original = File.ReadAllBytes(ResolveWorkspaceFile(TestPizzaPath));

        var (bytes, _) = RecognitionImagePreparer.Prepare(original, "image/jpeg", maxEdgePixels: 512);

        using var prepared = Image.Load<Rgb24>(bytes);
        Assert.InRange(AverageGreenDominance(prepared), -80, 40);
        Assert.InRange(AverageAdjacentRowLuminanceDelta(prepared), 0, 8);
    }
}
