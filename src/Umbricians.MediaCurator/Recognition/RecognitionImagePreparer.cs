using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Downscales recognition payloads so large originals do not inflate AI cost/latency.</summary>
internal static class RecognitionImagePreparer
{
    private const int JpegQuality = 85;
    private const string JpegMediaType = "image/jpeg";

    /// <summary>Default test folder under this project (see <c>test-output/</c>).</summary>
    internal const string DefaultTestOutputFolderName = "test-output";

    internal static string? ResolveTestOutputFolder(string? folder, string? contentRootPath = null)
    {
        if (string.IsNullOrWhiteSpace(folder))
        {
            return null;
        }

        folder = folder.Trim();
        return Path.IsPathRooted(folder)
            ? folder
            : Path.GetFullPath(Path.Combine(contentRootPath ?? Directory.GetCurrentDirectory(), folder));
    }

    public static (byte[] Bytes, string MediaType) Prepare(
        byte[] imageBytes,
        string mediaType,
        int maxEdgePixels,
        string? testOutputFolder = null,
        string? fileLabel = null)
    {
        if (maxEdgePixels <= 0 || imageBytes.Length == 0)
        {
            return ReturnOriginal(imageBytes, mediaType, testOutputFolder, fileLabel, "original");
        }

        try
        {
            var info = Image.Identify(imageBytes);
            if (info is null)
            {
                return ReturnOriginal(imageBytes, mediaType, testOutputFolder, fileLabel, "unidentified");
            }

            if (!NeedsResize(info, maxEdgePixels))
            {
                return ReturnOriginal(imageBytes, mediaType, testOutputFolder, fileLabel, "unchanged");
            }

            var prepared = ResizeAndEncodeJpeg(imageBytes, maxEdgePixels);
            WriteTestImage(testOutputFolder, fileLabel, prepared, JpegMediaType, "prepared");
            return (prepared, JpegMediaType);
        }
        catch (UnknownImageFormatException)
        {
            return ReturnOriginal(imageBytes, mediaType, testOutputFolder, fileLabel, "unknown-format");
        }
        catch (InvalidImageContentException)
        {
            return ReturnOriginal(imageBytes, mediaType, testOutputFolder, fileLabel, "invalid");
        }
    }

    private static bool NeedsResize(ImageInfo info, int maxEdgePixels)
        => info.Width > maxEdgePixels || info.Height > maxEdgePixels;

    private static byte[] ResizeAndEncodeJpeg(byte[] imageBytes, int maxEdgePixels)
    {
        using var image = Image.Load<Rgba32>(imageBytes);
        image.Mutate(x =>
        {
            x.AutoOrient();
            x.Resize(new ResizeOptions
            {
                Size = new Size(maxEdgePixels, maxEdgePixels),
                Mode = ResizeMode.Max,
            });
            x.BackgroundColor(Color.White);
        });

        // Pin the encoding: left unset, ImageSharp reuses the source's JPEG settings, and a
        // progressive source re-encodes as a non-interleaved baseline JPEG (one scan per channel)
        // that many decoders, including AI providers', render as green stripes.
        using var output = new MemoryStream();
        image.SaveAsJpeg(output, new JpegEncoder
        {
            Quality = JpegQuality,
            Interleaved = true,
            ColorType = JpegEncodingColor.YCbCrRatio420,
        });
        return output.ToArray();
    }

    private static (byte[] Bytes, string MediaType) ReturnOriginal(
        byte[] imageBytes,
        string mediaType,
        string? testOutputFolder,
        string? fileLabel,
        string stage)
    {
        WriteTestImage(testOutputFolder, fileLabel, imageBytes, mediaType, stage);
        return (imageBytes, mediaType);
    }

    private static void WriteTestImage(
        string? testOutputFolder,
        string? fileLabel,
        byte[] bytes,
        string mediaType,
        string stage)
    {
        if (string.IsNullOrWhiteSpace(testOutputFolder) || bytes.Length == 0)
        {
            return;
        }

        try
        {
            Directory.CreateDirectory(testOutputFolder);
            var label = SanitizeFileLabel(fileLabel);
            var extension = ExtensionForMediaType(mediaType);
            var dimensions = TryFormatDimensions(bytes);
            var fileName = $"{DateTime.UtcNow:yyyyMMdd-HHmmss-fff}_{label}_{stage}_{dimensions}{extension}";
            var path = Path.Combine(testOutputFolder, fileName);
            File.WriteAllBytes(path, bytes);
        }
        catch (IOException)
        {
            // Debug-only; never fail recognition when the test folder cannot be written.
        }
        catch (UnauthorizedAccessException)
        {
        }
    }

    private static string SanitizeFileLabel(string? fileLabel)
    {
        if (string.IsNullOrWhiteSpace(fileLabel))
        {
            return "image";
        }

        var invalid = Path.GetInvalidFileNameChars();
        var chars = fileLabel.Trim().Select(c => invalid.Contains(c) ? '-' : c).ToArray();
        var sanitized = new string(chars);
        return sanitized.Length > 40 ? sanitized[..40] : sanitized;
    }

    private static string ExtensionForMediaType(string mediaType)
        => mediaType.Equals("image/png", StringComparison.OrdinalIgnoreCase) ? ".png"
            : mediaType.Equals("image/gif", StringComparison.OrdinalIgnoreCase) ? ".gif"
            : mediaType.Equals("image/webp", StringComparison.OrdinalIgnoreCase) ? ".webp"
            : ".jpg";

    private static string TryFormatDimensions(byte[] bytes)
    {
        try
        {
            var info = Image.Identify(bytes);
            return info is null ? "unknown" : $"{info.Width}x{info.Height}";
        }
        catch (UnknownImageFormatException)
        {
            return "unknown";
        }
        catch (InvalidImageContentException)
        {
            return "unknown";
        }
    }
}
