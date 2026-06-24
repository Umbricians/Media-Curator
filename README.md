# MediaCurator

MediaCurator is an Umbraco 17+ package that automatically categorizes and organizes images
in the Media section. It uses pluggable **curation providers** to decide where each image
belongs, then sorts images into folder structures — on demand, in bulk, or via
Umbraco.Automate workflows. See [docs/MediaCurator-Scope-Document.md](docs/MediaCurator-Scope-Document.md)
for the full product scope.

## Packages

| Package | Purpose |
|---|---|
| `Umbricians.MediaCurator` | Core package: providers, rulesets, engine, backoffice UI |
| `Umbricians.MediaCurator.Automate` | Companion: triggers + actions for the (pre-release) Umbraco.Automate workflow engine |

## Key features

- **Scoped rulesets** — attach a ruleset to any media folder; nearest ancestor wins.
- **Nested, conditional rules** — each rule contributes folder levels; children can be
  conditional on the parent's resolved value, edited in a visual node-based designer with
  live example-path previews.
- **Built-in providers** — Date Folders, EXIF Value, AI Tag/Subject, Color,
  Library Classification (public-domain Dewey levels + LCC outline + custom tables),
  Dimensions/Orientation, Image Format, Filename Convention, Alphabetical.
- **Property provisioning with consent** — providers declare the media type properties they
  need; MediaCurator detects gaps and provisions them only after granular approval.
  Uninstalling never removes schema or data.
- **Safe by design** — dry-run preview before anything moves, activity log with one-click
  undo, exclusions/pinning, image-only filtering, and all moves through `IMediaService`
  so references and UDIs stay intact.
- **AI on your terms** — recognition runs on the [Umbraco.AI](https://www.nuget.org/packages/Umbraco.AI)
  abstractions (any configured provider), results are cached per image, and a
  metadata-only mode disables AI calls entirely (`MediaCurator:MetadataOnly`).

## Quick start

```bash
dotnet add package Umbricians.MediaCurator
```

1. Start your site — MediaCurator's migrations run automatically.
2. Open **Media → Media Curator**, create a ruleset, and pick a scope folder.
3. Add rules in the designer (e.g. Date `yyyy/MM` with a conditional Color child).
4. Use **Requirements** to approve any media type properties providers need.
5. **Curate now** shows the dry-run preview; confirm to move items. Undo from the activity log.

## Write your own provider

```csharp
public sealed class MyProvider : ICurationProvider
{
    public string Alias => "My.Provider";
    public string Name => "My Provider";
    public string Icon => "icon-box";
    public IEnumerable<PropertyRequirement> Requirements => [];
    public ProviderSettingsSchema SettingsSchema => ProviderSettingsSchema.Empty;

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken ct = default)
        => Task.FromResult(CurationResult.Resolved("value", new FolderSegment("Folder Name")));
}

// Composer:
builder.MediaCurator().AddProvider<MyProvider>();
```

Registered providers automatically appear in the designer with a settings UI generated
from their `SettingsSchema`, and participate in the provisioning consent flow. The
built-in [AlphabeticalProvider](src/Umbricians.MediaCurator/Providers/AlphabeticalProvider.cs)
is the reference "hello world" implementation.

## Configuration

```json
{
  "MediaCurator": {
    "MetadataOnly": false,
    "RecognitionProfileAlias": null,
    "ClassificationSchemeAlias": "dewey-pd",
    "MaxRecognitionEdgePixels": 1024
  }
}
```

## Development

```bash
# server
dotnet build && dotnet test tests/Umbricians.MediaCurator.Tests

# client (Lit/Vite)
cd src/Umbricians.MediaCurator/Client && npm install && npm run build && npm test

# E2E (requires the test site running)
dotnet run --project tests/Umbricians.MediaCurator.TestSite
cd tests/Umbricians.MediaCurator.E2E && npm install && npx playwright test
```

## License

MIT
