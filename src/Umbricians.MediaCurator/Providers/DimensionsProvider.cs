using SixLabors.ImageSharp;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>Sorts by aspect ratio: Landscape / Portrait / Square (§6). Bucket names are
/// configurable so brand terms or localized labels can be used.</summary>
public sealed class DimensionsProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Dimensions";

    public string Alias => ProviderAlias;

    public string Name => "Dimensions / Orientation";

    public string Icon => "icon-frame";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField { Alias = "landscape", Label = "Landscape folder", DefaultValue = "Landscape" },
            new ProviderSettingField { Alias = "portrait", Label = "Portrait folder", DefaultValue = "Portrait" },
            new ProviderSettingField { Alias = "square", Label = "Square folder", DefaultValue = "Square" },
            new ProviderSettingField
            {
                Alias = "squareTolerance",
                Label = "Square tolerance (%)",
                Type = SettingFieldType.Number,
                DefaultValue = "5",
                Description = "Width/height within this percentage counts as square.",
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        if (context.OpenFile is null)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        int width, height;
        try
        {
            using var stream = context.OpenFile();
            if (stream is null)
            {
                return Task.FromResult(CurationResult.Unresolved());
            }

            var info = Image.Identify(stream);
            width = info.Width;
            height = info.Height;
        }
        catch (Exception)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        if (width <= 0 || height <= 0)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var tolerance = double.TryParse(context.GetSetting("squareTolerance", "5"),
            System.Globalization.CultureInfo.InvariantCulture, out var t) ? t / 100.0 : 0.05;

        string bucket;
        if (Math.Abs(width - height) <= Math.Max(width, height) * tolerance)
        {
            bucket = context.GetSetting("square", "Square");
        }
        else
        {
            bucket = width > height
                ? context.GetSetting("landscape", "Landscape")
                : context.GetSetting("portrait", "Portrait");
        }

        return Task.FromResult(CurationResult.Resolved(bucket, new FolderSegment(bucket)));
    }
}
