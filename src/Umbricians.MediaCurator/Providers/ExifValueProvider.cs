using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images by the value of a configurable EXIF field (§5.3). Values can be used raw or
/// passed through a simple mapping table ("NIKON CORPORATION=Nikon", one per line). Declares
/// an optional property requirement for persisting extracted values so they are read once
/// and reusable; without it values are re-read from the file each run (degraded, §7).
/// </summary>
internal sealed class ExifValueProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Exif";

    public const string ExifDataPropertyAlias = "mediaCuratorExifData";

    public string Alias => ProviderAlias;

    public string Name => "EXIF Value";

    public string Icon => "icon-camera";

    public IEnumerable<PropertyRequirement> Requirements =>
    [
        new PropertyRequirement
        {
            Alias = ExifDataPropertyAlias,
            Name = "EXIF data (Media Curator)",
            EditorAlias = "Umbraco.TextArea",
            EditorUiAlias = "Umb.PropertyEditorUi.TextArea",
            ValueType = "TEXT",
            Mandatory = false,
            Description = "Extracted EXIF values cached by Media Curator so they are read from the file only once.",
        },
    ];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "tag",
                Label = "EXIF field",
                Type = SettingFieldType.Select,
                DefaultValue = "Make",
                Options =
                [
                    new SettingFieldOption { Value = "Make", Label = "Camera make" },
                    new SettingFieldOption { Value = "Model", Label = "Camera model" },
                    new SettingFieldOption { Value = "LensModel", Label = "Lens model" },
                    new SettingFieldOption { Value = "ISO", Label = "ISO" },
                    new SettingFieldOption { Value = "FNumber", Label = "Aperture (f-number)" },
                    new SettingFieldOption { Value = "ExposureTime", Label = "Exposure time" },
                    new SettingFieldOption { Value = "FocalLength", Label = "Focal length" },
                ],
            },
            new ProviderSettingField
            {
                Alias = "mappings",
                Label = "Value mappings",
                Description = "Optional, one per line: rawValue=Folder Name (e.g. NIKON CORPORATION=Nikon). Unmapped values are used as-is.",
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var tag = context.GetSetting("tag", "Make");

        var value = context.Exif is not null && context.Exif.TryGetValue(tag, out var raw)
            ? raw?.Trim()
            : null;

        if (string.IsNullOrWhiteSpace(value))
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        value = ApplyMappings(value, context.GetSetting("mappings", string.Empty));

        return Task.FromResult(CurationResult.Resolved(value, new FolderSegment(value)));
    }

    private static string ApplyMappings(string value, string mappings)
    {
        if (string.IsNullOrWhiteSpace(mappings))
        {
            return value;
        }

        foreach (var line in mappings.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var separator = line.IndexOf('=');
            if (separator <= 0)
            {
                continue;
            }

            var from = line[..separator].Trim();
            var to = line[(separator + 1)..].Trim();
            if (from.Equals(value, StringComparison.OrdinalIgnoreCase) && to.Length > 0)
            {
                return to;
            }
        }

        return value;
    }
}
