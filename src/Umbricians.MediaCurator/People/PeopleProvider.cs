using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.People;

/// <summary>Sorts images by whether the AI decided they show people ("People" / "No people", configurable).
/// Uses the stored decision when there is one; otherwise decides from the image's description.</summary>
public sealed class PeopleProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.People";

    /// <summary>Resolved values, for conditions on child rules.</summary>
    public const string PeopleValue = "people";

    public const string NoPeopleValue = "no-people";

    private readonly IPeopleDetectionService _people;

    public PeopleProvider(IPeopleDetectionService people) => _people = people;

    public string Alias => ProviderAlias;

    public string Name => "People";

    public string Icon => "icon-users";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema { get; } = new()
    {
        Fields =
        [
            new ProviderSettingField { Alias = "people", Label = "Folder for images with people", DefaultValue = "People" },
            new ProviderSettingField { Alias = "noPeople", Label = "Folder for images without people", DefaultValue = "No people" },
        ],
    };

    public async Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        if (context.RecognizeAsync is null)
        {
            return CurationResult.Unresolved();
        }

        var recognition = await context.RecognizeAsync(null, cancellationToken);
        if (recognition is null)
        {
            return CurationResult.Unresolved();
        }

        var detection = await _people.DetectAsync(
            context.MediaKey,
            recognition.Description,
            recognition.Tags,
            force: false,
            cancellationToken);
        if (detection is null)
        {
            return CurationResult.Unresolved();
        }

        return detection.ContainsPeople
            ? CurationResult.Resolved(PeopleValue, new FolderSegment(context.GetSetting("people", "People")))
            : CurationResult.Resolved(NoPeopleValue, new FolderSegment(context.GetSetting("noPeople", "No people")));
    }
}
