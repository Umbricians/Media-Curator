using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Simple A–Z bucketing by item name (§6) — useful for very large flat libraries, and the
/// documented "hello world" reference provider for the developer tutorial. Names that do
/// not start with a letter go into a configurable fallback bucket.
/// </summary>
public sealed class AlphabeticalProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Alphabetical";

    public const string DefaultOtherBucket = "#";

    public string Alias => ProviderAlias;

    public string Name => "Alphabetical";

    public string Icon => "icon-fa-arrow-down-a-z";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "otherBucket",
                Label = "Non-letter bucket",
                Description = "Folder name for items whose name does not start with a letter.",
                DefaultValue = DefaultOtherBucket,
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var name = context.MediaName?.Trim();
        if (string.IsNullOrEmpty(name))
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var first = name[0];
        var bucket = char.IsLetter(first)
            ? context.Culture.TextInfo.ToUpper(first).ToString()
            : context.GetSetting("otherBucket", DefaultOtherBucket);

        return Task.FromResult(CurationResult.Resolved(bucket, new FolderSegment(bucket)));
    }
}
