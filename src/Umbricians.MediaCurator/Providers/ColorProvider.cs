using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images by color (§5.4): the dominant (or average) color is extracted with
/// ImageSharp and snapped to a configurable palette. Folder names come from the palette
/// entry names — never raw hex codes.
/// </summary>
public sealed class ColorProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Color";

    /// <summary>The 12 basic color terms (defaults; replaceable per rule with e.g. a brand palette).</summary>
    public const string DefaultPalette =
        "Red=#FF0000\nOrange=#FFA500\nYellow=#FFFF00\nGreen=#008000\nBlue=#0000FF\nPurple=#800080\n" +
        "Pink=#FFC0CB\nBrown=#8B4513\nBlack=#000000\nWhite=#FFFFFF\nGray=#808080\nCyan=#00FFFF";

    public string Alias => ProviderAlias;

    public string Name => "Color";

    public string Icon => "icon-colorpicker";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "palette",
                Label = "Palette",
                Description = "One per line: Name=#hex. The extracted color snaps to the nearest entry; the entry name becomes the folder.",
                DefaultValue = DefaultPalette,
            },
            new ProviderSettingField
            {
                Alias = "mode",
                Label = "Extraction mode",
                Type = SettingFieldType.Select,
                DefaultValue = "dominant",
                Options =
                [
                    new SettingFieldOption { Value = "dominant", Label = "Dominant color" },
                    new SettingFieldOption { Value = "average", Label = "Average color" },
                ],
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        if (context.OpenFile is null)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var palette = ParsePalette(context.GetSetting("palette", DefaultPalette));
        if (palette.Count == 0)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        Rgb24? color;
        try
        {
            using var stream = context.OpenFile();
            if (stream is null)
            {
                return Task.FromResult(CurationResult.Unresolved());
            }

            color = Extract(stream, context.GetSetting("mode", "dominant"), palette);
        }
        catch (Exception)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        if (color is null)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var entry = Snap(color.Value, palette);
        return Task.FromResult(CurationResult.Resolved(entry.Name, new FolderSegment(entry.Name)));
    }

    internal sealed record PaletteEntry(string Name, Rgb24 Color);

    internal static List<PaletteEntry> ParsePalette(string text)
    {
        var entries = new List<PaletteEntry>();
        foreach (var line in (text ?? string.Empty).Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var separator = line.IndexOf('=');
            if (separator <= 0)
            {
                continue;
            }

            var name = line[..separator].Trim();
            var hex = line[(separator + 1)..].Trim().TrimStart('#');
            if (name.Length == 0 || hex.Length != 6 || !uint.TryParse(hex, System.Globalization.NumberStyles.HexNumber, null, out var rgb))
            {
                continue;
            }

            entries.Add(new PaletteEntry(name, new Rgb24((byte)(rgb >> 16), (byte)(rgb >> 8), (byte)rgb)));
        }

        return entries;
    }

    // A pixel this dark or this colourless is a neutral (black/gray/white) rather than a hue.
    private const float NeutralMaxValue = 0.12f;
    private const float NeutralMaxSaturation = 0.2f;

    // Coloured pixels covering at least this share of the image decide its colour, so a
    // coloured subject wins over a larger black, white or gray background.
    private const float ChromaticShareThreshold = 0.2f;

    private static Rgb24? Extract(Stream stream, string mode, List<PaletteEntry> palette)
    {
        using var image = Image.Load<Rgb24>(stream);
        // Downscale for speed; 32px preserves the dominant hue well enough.
        image.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(32, 32), Mode = ResizeMode.Max }));

        if (mode == "average")
        {
            long r = 0, g = 0, b = 0, n = 0;
            image.ProcessPixelRows(accessor =>
            {
                for (var y = 0; y < accessor.Height; y++)
                {
                    foreach (var px in accessor.GetRowSpan(y))
                    {
                        r += px.R; g += px.G; b += px.B; n++;
                    }
                }
            });
            return n == 0 ? null : new Rgb24((byte)(r / n), (byte)(g / n), (byte)(b / n));
        }

        // Dominant: classify every pixel, then prefer the most frequent coloured entry when
        // coloured pixels are a meaningful share of the image.
        var counts = new int[palette.Count];
        var chromaticPixels = 0;
        var totalPixels = 0;
        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
            {
                foreach (var px in accessor.GetRowSpan(y))
                {
                    counts[SnapIndex(px, palette)]++;
                    totalPixels++;
                    if (!IsNeutral(Hsv.From(px)))
                    {
                        chromaticPixels++;
                    }
                }
            }
        });

        if (totalPixels == 0)
        {
            return null;
        }

        var preferChromatic = chromaticPixels >= totalPixels * ChromaticShareThreshold;
        var best = -1;
        for (var i = 0; i < palette.Count; i++)
        {
            if (counts[i] == 0 || (preferChromatic && IsNeutral(Hsv.From(palette[i].Color))))
            {
                continue;
            }

            if (best < 0 || counts[i] > counts[best])
            {
                best = i;
            }
        }

        // A palette of only neutrals (or a stray tally) falls back to the overall winner.
        if (best < 0)
        {
            best = Array.IndexOf(counts, counts.Max());
        }

        return palette[best].Color;
    }

    internal static PaletteEntry Snap(Rgb24 color, List<PaletteEntry> palette)
        => palette[SnapIndex(color, palette)];

    /// <summary>Neutral pixels match neutral palette entries by brightness; coloured pixels
    /// match coloured entries mainly by hue. Plain RGB distance is dominated by brightness,
    /// which filed dark navies under Black and teal-blues under Gray.</summary>
    private static int SnapIndex(Rgb24 color, List<PaletteEntry> palette)
    {
        var pixel = Hsv.From(color);
        var pixelIsNeutral = IsNeutral(pixel);

        var bestIndex = -1;
        var bestDistance = double.MaxValue;
        for (var i = 0; i < palette.Count; i++)
        {
            var entry = Hsv.From(palette[i].Color);
            if (IsNeutral(entry) != pixelIsNeutral)
            {
                continue;
            }

            var distance = pixelIsNeutral ? NeutralDistance(pixel, entry) : ChromaticDistance(pixel, entry);
            if (distance < bestDistance)
            {
                bestDistance = distance;
                bestIndex = i;
            }
        }

        // The palette has no entry of the pixel's kind (e.g. a brand palette with no black):
        // fall back to the nearest entry of any kind.
        return bestIndex >= 0 ? bestIndex : NearestByRgb(color, palette);
    }

    private static bool IsNeutral(Hsv color)
        => color.Value < NeutralMaxValue || color.Saturation < NeutralMaxSaturation;

    private static double NeutralDistance(Hsv pixel, Hsv entry)
        => Math.Abs(pixel.Value - entry.Value);

    private static double ChromaticDistance(Hsv pixel, Hsv entry)
    {
        // Hue difference as a fraction of the colour wheel (0–0.5), weighted to dominate;
        // saturation and value separate pairs that share a hue (Brown/Orange, Pink/Red).
        var hue = Math.Abs(pixel.Hue - entry.Hue);
        hue = Math.Min(hue, 1 - hue) * 4;
        var saturation = pixel.Saturation - entry.Saturation;
        var value = pixel.Value - entry.Value;
        return (hue * hue) + (0.5 * saturation * saturation) + (0.5 * value * value);
    }

    private static int NearestByRgb(Rgb24 color, List<PaletteEntry> palette)
    {
        var bestIndex = 0;
        var bestDistance = int.MaxValue;
        for (var i = 0; i < palette.Count; i++)
        {
            var p = palette[i].Color;
            var dr = color.R - p.R;
            var dg = color.G - p.G;
            var db = color.B - p.B;
            // Weighted distance approximating perceptual difference.
            var distance = (2 * dr * dr) + (4 * dg * dg) + (3 * db * db);
            if (distance < bestDistance)
            {
                bestDistance = distance;
                bestIndex = i;
            }
        }

        return bestIndex;
    }

    /// <summary>Hue, saturation and value, each 0–1.</summary>
    private readonly record struct Hsv(double Hue, double Saturation, double Value)
    {
        public static Hsv From(Rgb24 color)
        {
            var r = color.R / 255d;
            var g = color.G / 255d;
            var b = color.B / 255d;
            var max = Math.Max(r, Math.Max(g, b));
            var min = Math.Min(r, Math.Min(g, b));
            var delta = max - min;

            double hue = 0;
            if (delta > 0)
            {
                hue = max == r ? ((g - b) / delta) % 6
                    : max == g ? ((b - r) / delta) + 2
                    : ((r - g) / delta) + 4;
                hue /= 6;
                if (hue < 0)
                {
                    hue += 1;
                }
            }

            return new Hsv(hue, max == 0 ? 0 : delta / max, max);
        }
    }
}
