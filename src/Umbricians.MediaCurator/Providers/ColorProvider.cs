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

        // Dominant: snap every pixel to the palette and pick the most frequent entry's color.
        var counts = new int[palette.Count];
        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
            {
                foreach (var px in accessor.GetRowSpan(y))
                {
                    counts[SnapIndex(px, palette)]++;
                }
            }
        });

        var best = Array.IndexOf(counts, counts.Max());
        return best < 0 ? null : palette[best].Color;
    }

    internal static PaletteEntry Snap(Rgb24 color, List<PaletteEntry> palette)
        => palette[SnapIndex(color, palette)];

    private static int SnapIndex(Rgb24 color, List<PaletteEntry> palette)
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
}
