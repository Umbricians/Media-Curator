using Umbraco.Cms.Core.Composing;
using Umbricians.MediaCurator.Extensions;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Demo;

/// <summary>Adds the demo's photo subject scheme to the Classification provider.</summary>
public sealed class PhotoSubjectSchemeComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder) => builder.AddMediaCuratorScheme<PhotoSubjectScheme>();
}

/// <summary>
/// A small classification scheme for photo libraries: the AI picks one of six subjects for each image. The screenshot
/// script sorts the demo photos with it, and it shows how a site adds its own scheme.
/// </summary>
internal sealed class PhotoSubjectScheme : IClassificationScheme
{
    public const string SchemeAlias = "demo-photo-subject";

    private static readonly IReadOnlyList<ClassificationEntry> Entries =
    [
        new("PEOPLE", "People", null),
        new("NATURE", "Nature", null),
        new("FOOD", "Food", null),
        new("PLACES", "Places", null),
        new("PRODUCTS", "Products", null),
        new("OTHER", "Other", null),
    ];

    public string Alias => SchemeAlias;

    public string Name => "Photo subject (demo)";

    public string DecisionGuidance =>
        "Classify by the main subject of the photo. People: people are the subject. Nature: landscapes, plants, "
        + "animals, sea and sky. Food: food or drink. Places: buildings, streets, cities and interiors. Products: "
        + "a single object shown on its own, as in a product photo. Other: anything else.";

    public ClassificationEntry? GetEntry(string code)
        => Entries.FirstOrDefault(entry => entry.Code.Equals(code, StringComparison.OrdinalIgnoreCase));

    public IReadOnlyList<ClassificationEntry> GetPath(string code) => GetEntry(code) is { } entry ? [entry] : [];

    public IReadOnlyList<ClassificationEntry> GetAllEntries() => Entries;

    public IReadOnlyList<ClassificationEntry> GetChildren(string? parentCode) => parentCode is null ? Entries : [];
}
