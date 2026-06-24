using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images into nested date folders (§5.1). The folder pattern uses standard date
/// format tokens with '/' producing folder levels (e.g. "yyyy/MM/dd", "yyyy/MMMM").
/// Month/day names are rendered in the ruleset's culture. EXIF DateTimeOriginal becomes an
/// additional source in the EXIF milestone.
/// </summary>
public sealed class DateFolderProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Date";

    public const string DefaultFormat = "yyyy/MM";

    public string Alias => ProviderAlias;

    public string Name => "Date Folders";

    public string Icon => "icon-calendar";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "format",
                Label = "Folder pattern",
                Description = "Date format tokens; each '/' produces a folder level. E.g. yyyy/MM/dd, yy/MM, yyyy/MMMM.",
                DefaultValue = DefaultFormat,
            },
            new ProviderSettingField
            {
                Alias = "source",
                Label = "Date source",
                Type = SettingFieldType.Select,
                DefaultValue = "createDate",
                Options =
                [
                    new SettingFieldOption { Value = "createDate", Label = "Upload (create) date" },
                    new SettingFieldOption { Value = "updateDate", Label = "Last updated date" },
                ],
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var format = context.GetSetting("format", DefaultFormat);
        var source = context.GetSetting("source", "createDate");

        var date = source switch
        {
            "updateDate" => context.UpdateDate,
            _ => context.CreateDate,
        };

        if (date == default)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        // Format each level separately: '/' inside a .NET date format string is the culture
        // date-separator token, but here it means a folder boundary.
        var parts = format.Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (parts.Length == 0)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        string[] segments;
        try
        {
            segments = parts.Select(p => date.ToString(p, context.Culture)).ToArray();
        }
        catch (FormatException)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        if (segments.Any(string.IsNullOrWhiteSpace))
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        return Task.FromResult(CurationResult.Resolved(string.Join('/', segments), segments));
    }
}
