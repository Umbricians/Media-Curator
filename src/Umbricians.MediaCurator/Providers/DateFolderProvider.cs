using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images into nested date folders (§5.1). The folder pattern uses standard date
/// format tokens with '/' producing folder levels (e.g. "yyyy/MM/dd", "yyyy/MMMM").
/// Month/day names are rendered in the ruleset's culture. EXIF DateTimeOriginal becomes an
/// additional source in the EXIF milestone. Each level is ordered by what its pattern part
/// means (months in calendar order, weekdays in week order) — see <see cref="GetFolderComparer"/>.
/// </summary>
public sealed class DateFolderProvider : ICurationProvider, ICurationFolderOrder
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
        var parts = SplitFormat(format);
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

    /// <summary>Orders the level's folders by the meaning of its pattern part, parsed back in the
    /// ruleset culture: yyyy/yy/MM/M/dd/d numerically, MMM/MMMM month names in calendar order,
    /// ddd/dddd weekday names in week order from the culture's first day of the week; composite parts
    /// ("MM-MMM", "MMMM yyyy") by the date components they contain. Names that do not match go last.</summary>
    public IComparer<string>? GetFolderComparer(FolderOrderContext context)
    {
        var parts = SplitFormat(context.GetSetting("format", DefaultFormat));
        return context.SegmentIndex < parts.Length
            ? DateFolderOrder.Create(parts[context.SegmentIndex], context.Culture)
            : null;
    }

    private static string[] SplitFormat(string format)
        => format.Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}
