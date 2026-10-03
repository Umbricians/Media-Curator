using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Recognition;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// The flagship AI provider (§6): sorts images by recognition tags. Configurable
/// tag-to-folder mapping, confidence threshold, and tie-break (highest confidence wins;
/// mapping order breaks ties). Declares the tags cache property requirement (§7).
/// </summary>
public sealed class AiTagProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.AiTag";

    public string Alias => ProviderAlias;

    public string Name => "AI Tag / Subject";

    public string Icon => "icon-brain";

    public IEnumerable<PropertyRequirement> Requirements => [RecognitionRequirements.Cache];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "mappings",
                Label = "Tag mappings",
                Description = "Optional, one per line: tag=Folder Name (e.g. product-shot=Products). When empty, the tag itself becomes the folder name.",
            },
            new ProviderSettingField
            {
                Alias = "threshold",
                Label = "Confidence threshold",
                Type = SettingFieldType.Number,
                DefaultValue = "0.6",
                Description = "Tags below this confidence are ignored (0–1).",
            },
            new ProviderSettingField
            {
                Alias = "mappedOnly",
                Label = "Mapped tags only",
                Type = SettingFieldType.Toggle,
                DefaultValue = "false",
                Description = "When on, only tags present in the mapping table produce folders; unmapped tags are ignored.",
            },
        ],
    };

    public async Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        if (context.RecognizeAsync is null)
        {
            return CurationResult.Unresolved();
        }

        var recognition = await context.RecognizeAsync(null, cancellationToken);
        if (recognition is null || recognition.Tags.Count == 0)
        {
            return CurationResult.Unresolved();
        }

        var threshold = ParseThreshold(context.GetSetting("threshold", "0.6"));
        var mappings = ParseMappings(context.GetSetting("mappings", string.Empty));
        var mappedOnly = context.GetSetting("mappedOnly", "false").Equals("true", StringComparison.OrdinalIgnoreCase);

        // Highest confidence wins; mapping order breaks ties for equal confidence.
        var candidates = recognition.Tags
            .Where(t => t.Confidence >= threshold)
            .OrderByDescending(t => t.Confidence)
            .ThenBy(t => MappingRank(mappings, t.Name))
            .ToList();

        foreach (var tag in candidates)
        {
            var mapped = mappings.FirstOrDefault(m => m.Tag.Equals(tag.Name, StringComparison.OrdinalIgnoreCase));
            if (mapped is not null)
            {
                return CurationResult.Resolved(tag.Name, new FolderSegment(mapped.Folder));
            }

            if (!mappedOnly)
            {
                return CurationResult.Resolved(tag.Name, new FolderSegment(tag.Name));
            }
        }

        return CurationResult.Unresolved();
    }

    private static double ParseThreshold(string value)
        => double.TryParse(value, System.Globalization.CultureInfo.InvariantCulture, out var t) ? Math.Clamp(t, 0, 1) : 0.6;

    private sealed record Mapping(string Tag, string Folder, int Rank);

    private static List<Mapping> ParseMappings(string text)
    {
        var mappings = new List<Mapping>();
        if (string.IsNullOrWhiteSpace(text))
        {
            return mappings;
        }

        var rank = 0;
        foreach (var line in text.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var separator = line.IndexOf('=');
            if (separator <= 0)
            {
                continue;
            }

            var tag = line[..separator].Trim();
            var folder = line[(separator + 1)..].Trim();
            if (tag.Length > 0 && folder.Length > 0)
            {
                mappings.Add(new Mapping(tag, folder, rank++));
            }
        }

        return mappings;
    }

    private static int MappingRank(List<Mapping> mappings, string tag)
    {
        var match = mappings.FirstOrDefault(m => m.Tag.Equals(tag, StringComparison.OrdinalIgnoreCase));
        return match?.Rank ?? int.MaxValue;
    }
}
