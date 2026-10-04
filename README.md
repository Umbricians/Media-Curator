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
- **Built-in providers** — date, EXIF, AI, color, classification, dimensions,
  format, filename, and alphabetical rules are included.
- **Property provisioning with consent** — providers declare the media type properties they
  need; MediaCurator detects gaps and provisions them only after granular approval.
  Uninstalling never removes schema or data.
- **Safe by design** — dry-run preview before anything moves, activity log with one-click
  undo, exclusions/pinning, image-only filtering, and all moves through `IMediaService`
  so references and UDIs stay intact.
- **Built for large libraries** — "Curate images" on a folder with more than 100 images (at any
  depth) skips the preview and runs in the background, with progress in a notification and in
  the Activity log, so no request outlasts hosting time limits. Curating 10,000 images in one
  flat folder takes about nine minutes on a development machine, with no AI involved.
- **AI on your terms** — recognition runs on the [Umbraco.AI](https://www.nuget.org/packages/Umbraco.AI)
  abstractions (any configured provider), results are cached per image, and AI can be
  switched off entirely in the setup. Classification decisions can optionally use TypeSafe's Jev.
- **People detection** — turn on *Detect people* in Setup and analysis also decides, from the
  stored description and tags (the image is never re-sent), whether each image shows people.
  The media tree marks those images and every folder above them, so editors can find them for
  privacy or model-release review. See [People detection](docs/people-detection.md).

## Built-in providers

- [Date Folders](docs/providers/date-folders.md): builds nested folders from upload or update dates.
- [EXIF Value](docs/providers/exif-value.md): reads camera metadata and can map raw values to friendly folder names.
- [AI Tag / Subject](docs/providers/ai-tag-subject.md): uses Umbraco.AI recognition tags with confidence thresholds and optional tag mappings.
- [Color](docs/providers/color.md): extracts dominant or average color and snaps it to a named palette.
- [Classification](docs/providers/classification.md): resolves classification codes through built-in schemes (subject, genre/format or web asset role) or a custom code table.
- [Dimensions / Orientation](docs/providers/dimensions-orientation.md): sorts images into landscape, portrait, or square folders.
- [Image Format](docs/providers/image-format.md): groups images by extension, including JPEG, PNG, SVG, GIF, WebP, AVIF, and other formats.
- [Filename Convention](docs/providers/filename-convention.md): extracts a folder name from the media name with a regular expression.
- [People](docs/providers/people.md): sorts images into "People" / "No people" folders from the people detection result.
- [Alphabetical](docs/providers/alphabetical.md): buckets media by the first letter of the item name.

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
built-in [Alphabetical provider](docs/providers/alphabetical.md)
is the reference "hello world" implementation.

## Configuration

Everything is configured in the backoffice under **Settings › Media Curator › Setup** and stored in
the database; Media Curator reads no app settings:

- AI on/off, saving image descriptions, image size, images analyzed at once.
- The Umbraco.AI profile and reasoning effort for describing images and for decisions.
- How codes are chosen (one step, level by level, or a single call with the image) and the decision
  engine (Umbraco.AI or Jev, with the TypeSafe API key stored encrypted).
- Diagnostics: saving the prepared images sent to the AI.

The one exception is the TypeSafe API key, which can instead come from server configuration as
`MediaCurator:Secrets:TypeSafeApiKey`: app settings, user secrets, an environment variable
(`MediaCurator__Secrets__TypeSafeApiKey`) or Azure Key Vault (`MediaCurator--Secrets--TypeSafeApiKey`).
When set, it wins over a key saved in the backoffice, and the setup's key field is locked.

The classification scheme is not a site setting: each ruleset's Classification rule sets it,
and analysis uses the scheme of the ruleset that curates the image. Sites upgrading from versions that
read a `"MediaCurator"` app settings section have its values imported into the setup once; the section
can then be removed.

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
