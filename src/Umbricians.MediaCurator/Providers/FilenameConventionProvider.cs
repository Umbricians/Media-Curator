using System.Text.RegularExpressions;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>Extracts a folder segment from a regex pattern in the item name (§6),
/// e.g. <c>^(PROJ-\d+)</c> turns "PROJ-1234_hero.jpg" into a PROJ-1234 folder.</summary>
public sealed partial class FilenameConventionProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Filename";

    public string Alias => ProviderAlias;

    public string Name => "Filename Convention";

    public string Icon => "icon-tag";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "pattern",
                Label = "Pattern (regex)",
                DefaultValue = @"^([A-Za-z]+-\d+)",
                Description = "A .NET regular expression; the first capture group (or whole match) becomes the folder name.",
            },
        ],
    };

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var name = context.MediaName?.Trim();
        var pattern = context.GetSetting("pattern", @"^([A-Za-z]+-\d+)");
        if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(pattern))
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        Match match;
        try
        {
            match = Regex.Match(name, pattern, RegexOptions.None, TimeSpan.FromMilliseconds(250));
        }
        catch (Exception)
        {
            // Invalid pattern or timeout: configuration problem, not an item problem.
            return Task.FromResult(CurationResult.Unresolved());
        }

        if (!match.Success)
        {
            return Task.FromResult(CurationResult.Unresolved());
        }

        var value = (match.Groups.Count > 1 && match.Groups[1].Success ? match.Groups[1].Value : match.Value).Trim();
        return value.Length == 0
            ? Task.FromResult(CurationResult.Unresolved())
            : Task.FromResult(CurationResult.Resolved(value, new FolderSegment(value)));
    }
}
