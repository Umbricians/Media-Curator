using Umbraco.Cms.Core.Media;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>Sorts by aspect ratio: Landscape / Portrait / Square (§6). Bucket names are
/// configurable so brand terms or localized labels can be used.</summary>
/// <remarks>The dimensions come from Umbraco's image dimension extractor, the same one that sets a media item's width
/// and height on upload. It takes EXIF orientation into account, so a photo stored sideways but shown upright is sorted
/// by how it is shown. A site without an imaging package has Umbraco's no-op extractor, which finds no dimensions, so
/// images stay unresolved.</remarks>
internal sealed class DimensionsProvider : ICurationProvider
{
    private readonly IImageDimensionExtractor _dimensionExtractor;

    public DimensionsProvider(IImageDimensionExtractor dimensionExtractor) => _dimensionExtractor = dimensionExtractor;

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

            if (_dimensionExtractor.GetDimensions(stream) is not { } size)
            {
                return Task.FromResult(CurationResult.Unresolved());
            }

            width = size.Width;
            height = size.Height;
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
