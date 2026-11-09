using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>Sorts by image format group (§6): Photos/JPEG, PNG, SVG/Vectors, GIF/Animated,
/// WebP/AVIF — group names configurable.</summary>
internal sealed class ImageFormatProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Format";

    public string Alias => ProviderAlias;

    public string Name => "Image Format";

    public string Icon => "icon-document";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField { Alias = "jpeg", Label = "JPEG folder", DefaultValue = "Photos" },
            new ProviderSettingField { Alias = "png", Label = "PNG folder", DefaultValue = "PNG" },
            new ProviderSettingField { Alias = "svg", Label = "SVG folder", DefaultValue = "Vectors" },
            new ProviderSettingField { Alias = "gif", Label = "GIF folder", DefaultValue = "Animated" },
            new ProviderSettingField { Alias = "modern", Label = "WebP/AVIF folder", DefaultValue = "Modern" },
            new ProviderSettingField { Alias = "other", Label = "Other formats folder", DefaultValue = "Other" },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var extension = Path.GetExtension(context.MediaName ?? string.Empty).ToLowerInvariant().TrimStart('.');
        if (extension.Length == 0)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var (key, fallback) = extension switch
        {
            "jpg" or "jpeg" or "jfif" => ("jpeg", "Photos"),
            "png" => ("png", "PNG"),
            "svg" => ("svg", "Vectors"),
            "gif" or "apng" => ("gif", "Animated"),
            "webp" or "avif" or "heic" => ("modern", "Modern"),
            _ => ("other", "Other"),
        };

        var bucket = context.GetSetting(key, fallback);
        return Task.FromResult(CurationResult.Resolved(extension, new FolderSegment(bucket)));
    }
}
