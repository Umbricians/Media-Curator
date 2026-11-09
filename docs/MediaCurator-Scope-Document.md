# MediaCurator — Initial Scope Document

**Package:** `Umbricians.MediaCurator` (working name)
**Status:** Draft v0.4
**Author:** Chris (Umbricians)
**Date:** June 2026

---

## 1. Vision

MediaCurator is an Umbraco package that automatically categorizes and organizes images in the Media section. It uses AI image recognition (via the Umbraco.AI package family) to understand what images contain, then sorts them into folder structures according to configurable, extensible rules.

The Media section is often the messiest part of a long-running Umbraco site: thousands of images dumped at the root or into vague folders, named `IMG_4031 (final) (2).jpg`. MediaCurator turns this into a self-organizing library — images land in the right place automatically, and existing libraries can be reorganized in bulk.

The package is built **extensibility-first**: the core ships with a set of useful categorization providers, but the primary design goal is that any developer can write their own provider, naming strategy, or rule condition with a small amount of code and have it appear in the backoffice UI alongside the built-in ones.

## 2. Goals

- Automatically sort images into folder structures on demand, in bulk, or via automated workflows.
- Use AI image recognition to tag images, and make those tags available to categorization rules.
- Ship a provider model so that "how media is categorized" is pluggable and composable, with **every provider user-configurable** through its own settings UI.
- Allow different categorization structures under different parent folders — rules are **scoped**, not global, and scopes can be attached to any folder at any depth, not just top-level folders.
- Support **nested rules**: a rule's output can itself be further categorized by child rules (e.g. sort by year, then within each year sort by AI subject tag).
- Provide a **visual, workflow-style configuration interface** so users can see and understand how rules chain and nest before anything moves.
- **Self-provision required metadata**: providers declare the media type properties they need; MediaCurator detects gaps and, with the user's explicit (granular) approval, adds the missing properties automatically (§7).
- Integrate with **Umbraco.Automate** for automation: MediaCurator contributes triggers and actions so curation can be composed into Automate workflows alongside AI agents and other automation steps.
- Respect **localization**: generated folder names honor culture settings (e.g. month names, bucket labels).
- Provide a safe operator experience: preview/dry-run, audit trail, and the ability to exclude folders entirely.
- Keep Umbraco references intact — moving media must never break content that uses it (moves use the Umbraco media service so UDIs/keys are preserved).

## 3. Non-Goals (v1)

- **Non-image media.** MediaCurator ignores any media item that is not an image (documents, video, audio, generic files). Non-image support is a candidate for a later version; the provider contract is designed so it can be added without breaking changes.
- Renaming media files or media item names (future consideration as a "naming strategy" extension point).
- De-duplication of media (a possible future provider/companion feature).
- DAM-style features (versioning, approval workflows, usage licensing).
- Front-end/delivery API features — this is a backoffice/content-management tool.
- Building our own automation/trigger engine — automation is delegated to Umbraco.Automate (see §9).
- **AI-suggested rules** ("you have 400 untagged screenshots — create a Screenshots rule?") — agreed as valuable, deferred to a later version (§15, Future).
- **Virtual views / smart folders** (finding images in different ways irrespective of physical folders) — recognized as potentially useful, parked as a future direction (§15, Future).

## 4. Key Concepts

| Concept | Description |
|---|---|
| **Curation Provider** | A pluggable unit that, given an image, returns the folder segment(s) it belongs under. E.g. the Date provider returns `2026/06/10`. |
| **Curation Rule** | A configured instance of a provider — the provider plus its user-configured settings (e.g. "Date provider, format = `yy/MM`"). |
| **Rule Scope** | The parent folder a ruleset applies to. Any media folder at any depth can be a scope root. |
| **Rule Chain (nesting)** | An ordered tree of rules within a scope. Each rule contributes one or more levels of the resulting folder path; rules can have (conditional) child rules. |
| **Property Requirement** | A media type property a provider needs to do its job (e.g. an image description property, EXIF metadata properties). Declared by the provider, checked and provisioned by MediaCurator (§7). |
| **Recognition Pipeline** | The AI step that analyses an image (via Umbraco.AI) and writes tags/metadata onto the media item before categorization runs. |
| **Curation Trigger** | What causes categorization to run: manual ("curate this folder now"), bulk/background job, or an Umbraco.Automate workflow (e.g. on media upload). |

### 4.1 Scoping model

A site administrator attaches a **ruleset** to any media folder. That ruleset governs everything beneath it unless a descendant folder defines its own ruleset, which takes over for its own subtree (nearest-ancestor-wins, the same mental model as Umbraco permissions/cultures).

```
Media
├── Products            ← ruleset A: [AI Tag] → [Color]
│   └── Clearance       ← ruleset B: [Date yy/MM] (overrides A for this subtree)
├── Press
│   └── Photography     ← ruleset C: [EXIF: Camera Model] → [Date yyyy/MM/dd]
└── Misc                ← no ruleset: MediaCurator leaves it alone
```

### 4.2 Nesting model

Within a ruleset, rules compose into a path. Each rule node may declare child rules, and children can be **conditional** — e.g. only apply the Color rule when the AI Tag rule resolved to "product-shot". A rule that cannot resolve a value falls through to a configurable behaviour: skip the level, route to an "Unsorted" segment, or stop and leave the item where it is.

### 4.3 Provider configurability

Every provider is user-configurable, not hard-coded. Each provider declares a settings schema (rendered automatically in the rule editor) covering its options — format patterns, mappings, thresholds, fallbacks. The Date provider's format option (`yyyy/MM/dd`, `yy/MM`, `yyyy`, …) is the canonical example; the same principle applies to every provider, built-in or third-party.

## 5. Core Categorization Providers (v1)

### 5.1 Date Folders Provider

Sorts images into nested date folders.

- **Configurable folder pattern** using standard date format tokens, e.g. `yyyy/MM/dd`, `yyyy/MM`, `yy/MM`, `yyyy`, or `yyyy/MMMM` (localized month names). Each `/` produces a folder level.
- Configurable date source: upload (create) date, Umbraco update date, or EXIF `DateTimeOriginal`, with a fallback order (e.g. EXIF → create date).
- Month/day names rendered through the localization layer (§10).

### 5.2 Classification Provider

Sorts images according to a recognized classification scheme. **Only schemes that are public domain or freely usable without a license are embedded**, and scheme data lives in replaceable resource files behind a pluggable scheme model (`IClassificationScheme`), so additional open lists can be added by us or by third parties.

Built-in schemes (v1):

- **Dewey-based scheme** — strictly the **public-domain levels** of the Dewey system (high-level classes/divisions from out-of-copyright editions). Modern DDC editions are proprietary to OCLC and are explicitly not embedded; documentation states the boundary.
- **Library of Congress Classification (LCC)** — the LCC outline (classes A–Z and subclasses), freely available from the Library of Congress.
- **Thesaurus for Graphic Materials (TGM), genre/format terms** — what kind of picture an item is (photographs, posters, drawings, maps, …). A US government work in the public domain, generated from the Library of Congress bulk download.
- **Web asset role** — MediaCurator's own small scheme describing what an image is for on a website (logo, hero banner, product shot, headshot, …).
- **Custom code tables** — administrator-defined or imported (code → folder path).

Candidate additional open schemes (license-vetted per scheme before inclusion, as built-ins or first-party add-ons):

- **IPTC Media Topics** (openly licensed news/media subject taxonomy).
- **Open Images / COCO label sets** (CC-licensed computer-vision class lists — a natural fit for mapping AI tags onto a stable taxonomy).
- **Wikidata-derived category lists** (CC0).

Behaviour:

- Scheme selection per rule; the code for an image is resolved from a configurable source: a media type property, an AI-suggested classification mapped onto the scheme, or a filename/metadata convention.
- Hierarchical codes naturally produce nested folders (e.g. LCC `N → NA` becomes `Fine Arts/Architecture`), pairing well with the nesting model.
- Folder naming options: code only (`770`), name only (`Photography`), or `code – name`.

### 5.3 EXIF Value Provider

Sorts images by the value of a configurable EXIF field.

- Administrator picks the EXIF tag (e.g. `Make`, `Model`, `LensModel`, `ISO`, `FNumber`, `GPS*`).
- Value transforms before becoming a folder name: raw value, mapped lookup table (e.g. `NIKON CORPORATION → Nikon`), or bucketed ranges for numeric fields (e.g. ISO `100–400`, `800–1600`).
- Declares property requirements for persisting extracted EXIF values onto items (§7), so values are extracted once and reusable by other rules and editors.
- Configurable fallback for images with no EXIF data (skip level / Unsorted / leave in place).
- Multiple instances can be chained (Camera Make → Camera Model).

### 5.4 Color Provider

Sorts images by color.

- Default mode: dominant color extracted from the image, snapped to a **configurable palette** (e.g. the 12 basic color terms, or a brand palette defined by the administrator).
- Alternative modes: average color; AI-described color ("warm tones", "monochrome") when the recognition pipeline is enabled.
- Folder naming from the palette entry name (`Red`, `Brand Blue`) — localized where the built-in palette is used — never raw hex codes.

## 6. Additional Suggested Providers

Candidates for the core package or first-party add-ons; each also serves as a reference implementation for third-party developers. All operate on images only in v1.

- **AI Tag / Subject Provider** — the flagship AI provider. Uses image recognition tags (e.g. `people`, `building`, `food`, `screenshot`, `logo`) to sort by subject. Configurable tag-to-folder mapping, confidence threshold, and tie-break order when an image has multiple tags.
- **AI Scene/Context Provider** — broader scene classification: indoor/outdoor, event, product shot, document scan, headshot. A natural top-level split before more specific rules.
- **People/Faces Provider** — sorts by "contains people / headshot / group / no people" using AI detection. Deliberately **presence/count-based only**: no facial identification of individuals, for both ethical and GDPR reasons.
- **Dimensions / Orientation Provider** — sorts by aspect ratio or resolution buckets: Landscape / Portrait / Square, or configurable buckets like Thumbnail / Web / Print / Hero.
- **Image Format Provider** — sorts by image format group (Photos/JPEG, PNG, SVG/Vectors, GIF/Animated, WebP/AVIF). The image-scoped successor to a general file-type provider, which becomes relevant again if non-image support lands later.
- **GPS Location Provider** — uses EXIF GPS data, optionally reverse-geocoded (pluggable geocoding service), to sort into Country / Region / City folders, with localized place names where the geocoder supports it.
- **Upload Source Provider** — sorts by uploading backoffice user, user group, or upload channel.
- **Usage Provider** — sorts by where an image is referenced in content, with an `Unused` segment that doubles as a cleanup-candidate folder. Built on Umbraco's relation/tracking APIs.
- **Filename Convention Provider** — extracts a folder segment from a regex/token pattern in the filename (e.g. `PROJ-1234_*.jpg → PROJ-1234`).
- **Alphabetical Provider** — simple A–Z (or A–C, D–F…) bucketing by name. Trivial, but useful for very large flat libraries and the documented "hello world" reference provider.

## 7. Media Type Property Provisioning

Many providers need somewhere to read or persist metadata: the AI providers need description/tag properties, the EXIF provider needs properties to store extracted values, the Classification provider may need a code property. Rather than failing or silently mutating schema, MediaCurator manages this through a **declare → check → consent → provision** flow:

1. **Declare** — each provider declares its `PropertyRequirement`s: alias, name, expected editor/data type, target media types (e.g. all image types, or user-selected), and whether the requirement is mandatory or optional for the provider to function.
2. **Check** — when a rule is added to a ruleset (and again when a ruleset is activated), MediaCurator inspects the relevant media types for matching properties. Matching is by alias first, with a compatibility check on the editor type; an administrator can also **map a requirement onto an existing property** with a different alias (e.g. an existing `photoDescription` property satisfies the "image description" requirement) instead of creating a new one. Where an existing property only **partially** matches (right alias but different editor type, or compatible editor under a different alias), the consent dialog offers **both options side by side** — map onto the existing property, or create the new property alongside it — with the implications of each stated (e.g. mapping reuses existing editor data; creating adds a parallel property).
3. **Consent** — missing properties are presented in an **approval dialog listing every proposed change**: which property, on which media type(s), with which data type. The user can approve **all, or select specific ones** — consent is granular per property/media type combination. Nothing is ever added without this approval.
4. **Provision** — approved properties are created automatically: data types are reused where a suitable one exists or created under a clearly named folder (e.g. *MediaCurator* in Settings), and properties are added to the media types in a dedicated **"Media Curator" property group/tab** so editors can see at a glance which properties are package-managed.

Additional behaviour:

- **Partial consent** — if a mandatory requirement is declined, the affected rule is marked *degraded* in the visual designer (clearly badged) and skips items it cannot evaluate; optional requirements simply reduce functionality (e.g. EXIF values re-extracted each run instead of persisted).
- **Permissions** — only users with rights to edit media types (Settings section access) can approve provisioning; others see the requirement summary and can request an admin's approval.
- **Re-check on demand** — a "verify requirements" action on each ruleset re-runs the check (useful after schema changes or environment moves).
- **Deployment & uninstall** — provisioned properties are ordinary schema, so they flow through uSync/Umbraco Deploy like any other media type change; the requirement check on the target environment recognizes them as satisfied. MediaCurator records which properties it created for transparency, but **uninstalling the package always leaves schema (and the data stored in it) untouched** — no automatic or offered cleanup. Administrators who want to remove the properties do so manually like any other media type change.
- **Extensibility** — third-party providers declare requirements through the same API and get the consent/provisioning UX for free.

## 8. AI Recognition Pipeline

- Built on the **Umbraco.AI** package abstractions, so the underlying model/provider (OpenAI, Anthropic, Azure, Google, local models, etc.) is whatever the site has configured — MediaCurator does not bind to a specific vendor.
- On trigger, images pass through recognition; resulting tags, descriptions, and classifications are stored on the media item in properties managed through the provisioning flow (§7) — e.g. a `mediaCuratorTags` property — so AI output is visible, editable, and reusable.
- Stored AI output is **cached on the item** — recognition runs once per image (re-run on demand or when the image content changes), so bulk re-categorization doesn't re-bill AI calls.
- Confidence thresholds and allowed-tag lists are configurable per rule, so noisy tags don't create noisy folders.
- The recognition step is itself an extension point: developers can register additional analyzers that enrich items before rules run (e.g. OCR text extraction, brand/logo detection).
- Cost controls: per-folder opt-in/opt-out for AI analysis, batch size limits, and a "metadata-only mode" where MediaCurator runs without any AI calls at all (all non-AI providers still work).
- Where a curation flow runs inside an Automate workflow, recognition can alternatively be performed by an **AI agent step** (via Umbraco.AI.Automate) whose structured output feeds MediaCurator's categorize action (§9.2).

### People detection

Optional (setting *Detect people*, default off). After recognition, a yes/no decision on whether the image shows real people is made from the stored description and tags: Jev (threshold 0.5) when Jev is the decision engine, otherwise one text-only Umbraco.AI call; failures never affect recognition. Results (key, answer, confidence, source, tree path, source file) are stored in `mediaCuratorPeople`, and a changed file triggers a new decision. An `IFlagProvider` adds `MediaCurator.ContainsPeople` to images and `MediaCurator.ContainsPeopleBelow` to folders on media tree items, using one node lookup and one path-prefix query per tree page and no AI calls. Media move, recycle-bin and delete notifications keep stored paths current. Badges render as entity signs in the media tree only (Umbraco's media grid and table views do not render signs). After analysis or curation the backoffice reloads every tree branch above the affected items. A People curation provider sorts into People / No people. See [People detection](people-detection.md).

## 9. Automation via Umbraco.Automate

> **Dependency note:** Umbraco.Automate is a new, **not-yet-officially-released** HQ workflow automation engine (`Umbraco.Automate.Core`, currently 0.1+, observed via the Umbraco.AI monorepo's dev branch). Its API surface — triggers, actions, settings, binding syntax — may change before release. MediaCurator's Automate integration ships as a **separate companion package** (`Umbricians.MediaCurator.Automate`) so the core package carries no hard dependency on a pre-release product, mirroring how `Umbraco.AI.Automate` is itself a separate integration package.

Rather than building its own trigger/automation engine, MediaCurator delegates automation to Umbraco.Automate, following the same integration pattern as Umbraco.AI.Automate (which contributes actions like "Run AI Agent" and triggers like agent-run-completed to Automate workflows).

### 9.1 Triggers contributed by MediaCurator

- **Media curated** — fires after a curation run completes (with run summary output for downstream steps, e.g. notify an editor channel).
- **Media curation failed** — fires when items fail to categorize.

### 9.2 Actions contributed by MediaCurator

- **Analyze image** — runs the recognition pipeline on a media item; outputs tags/classification for binding into subsequent steps.
- **Categorize media** — resolves the target folder for an item using the ruleset for its scope (or an explicitly selected ruleset) and moves it. Dry-run flag supported.
- **Curate folder** — runs a full ruleset over a folder (optionally recursive).

With Automate's own media triggers (e.g. media saved/uploaded), "auto-curate on upload" becomes simply a small Automate workflow: *Media uploaded → (optional: Run AI Agent / Analyze image) → Categorize media*. This keeps MediaCurator focused on categorization and lets users combine it freely with other automation steps (notifications, agent runs, content updates).

### 9.3 Standalone behaviour

The core package remains fully usable without Automate installed: manual "curate now", bulk background runs, and the dry-run preview all work standalone. Automate adds event-driven automation on top.

## 10. Localization

Folder names respect localization throughout:

- Date segments (`MMMM`, `dddd`) render localized month/day names.
- Built-in palette names, bucket labels (Landscape/Portrait), and scheme names ship with translations via standard Umbraco localization files (`en-US` baseline; community translations welcome).
- The culture used for folder naming is configurable per ruleset: a fixed culture, or the site's default culture. (A single physical folder tree cannot vary per backoffice user language, so folder names are generated against one configured culture; backoffice *UI* labels always follow the user's language.)
- `IFolderNameStrategy` implementations receive the resolved culture so custom strategies localize consistently.
- Generated names are sanitized for safe URLs/paths while preserving localized display names on the folder media items.

## 11. Backoffice Experience

### 11.1 Visual workflow-style ruleset designer

The centerpiece of the configuration UX is a **visual, node-based workflow designer**, replicating the UX of the Umbraco.Automate workflow editor so users who know one immediately understand the other. The Automate canvas ships bundled inside its client rather than as a reusable library, so MediaCurator **re-implements the same UX patterns** on `@umbraco-cms/backoffice`/UUI primitives — matching its interaction model (canvas, node configuration, branch rendering) rather than consuming its components.

- The scope folder is the entry node; each rule is a node with its configuration accessible inline; child/conditional rules branch visibly beneath their parent, so **the nesting structure is immediately legible** before anything runs.
- Conditional branches are rendered as labelled edges (e.g. "tag = product-shot →"), making fall-through behaviour (skip / Unsorted / stop) explicit on the canvas.
- A live **example path preview** on each leaf shows a sample resulting folder path (e.g. `Products/Red/2026/06`) as settings change.
- Property requirement status is surfaced on each node: satisfied, pending approval, or degraded (declined), linking straight into the consent dialog (§7).
- As Umbraco.Automate matures toward release, track whether its canvas becomes reusable; if HQ publishes it as a consumable library, migrate to it.

### 11.2 Operations

- **Preview / dry-run**: before applying, a tree of "what would move where" with counts and a sample of affected items. Nothing moves until confirmed. The single most important trust feature.
- **Curate now**: context-menu action on any media folder to run its ruleset on demand (current items only, or recursive).
- **Activity log**: an audit trail of what moved, when, why (which rule fired), and by which trigger — with **undo** for a curation run (original locations recorded, moves reversible).
- **Exclusions**: mark folders or individual items as pinned/excluded so MediaCurator never touches them. Non-image media is excluded implicitly in v1.
- **Health/status view**: queue length for background processing, AI usage counts, items that failed to categorize and why, outstanding property requirements.

## 12. Extensibility (Developer API)

The contract every provider implements (illustrative shape, not final):

```csharp
public interface ICurationProvider
{
    string Alias { get; }
    string Name { get; }

    /// <summary>
    /// Media type properties this provider needs (see §7).
    /// </summary>
    IEnumerable<PropertyRequirement> Requirements { get; }

    /// <summary>
    /// Returns the folder path segments this item should be placed under
    /// for this rule, or an empty result if the provider cannot resolve one.
    /// </summary>
    Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken ct);
}
```

- **Registration** via standard Umbraco composers / DI (`builder.AddMediaCuratorProvider<MyProvider>()`); discovered providers automatically appear as nodes in the visual designer and participate in the provisioning flow.
- **Per-provider configuration UI**: each provider declares its settings as a schema so the designer renders configuration without custom UI work; providers with richer needs can ship their own UI component via the standard backoffice extension manifest.
- **CurationContext** gives providers the media item, its file stream accessor, parsed EXIF, AI tags (if available), the resolved scope and culture, the provisioned property values, and the results of parent rules in the chain — enabling conditional/nested behaviour.
- **Classification schemes** are pluggable (`IClassificationScheme`) so additional open taxonomies can be added without touching the provider.
- **Folder naming strategies** are a separate extension point (`IFolderNameStrategy`), culture-aware (§10).
- **Notifications**: MediaCurator publishes Umbraco notifications (`MediaCuratingNotification`, `MediaCuratedNotification`, run started/completed, properties provisioned) so developers can veto, adjust targets, or react.
- **Pipeline hooks**: pre-/post-recognition enrichers; pre-move validators.
- **Automate surface**: custom providers automatically work inside the Categorize media action; developers can also contribute their own Automate actions that compose with MediaCurator's.
- Documentation will include a worked "build your own provider" tutorial using the Alphabetical provider as the example.

## 13. Technical Considerations

- **Minimum Umbraco version: 17.** This aligns with the Umbraco.AI family and the Automate integration, both of which require CMS 17+. New backoffice (Lit/web components) extension model throughout.
- **Image detection**: an item participates only if it is an image. Which media types (and, for custom media types with multiple file properties, **which file property is authoritative for analysis**) is **user-configurable**, defaulting to the built-in Image media type and an extension/MIME allow-list. Everything else is skipped and logged as ignored, not failed.
- **Reference safety**: all moves through `IMediaService` so keys, UDIs, and content references are preserved; folder creation is idempotent (find-or-create by name under parent).
- **Schema safety**: media type changes happen only through the consent flow (§7); MediaCurator never deletes or modifies existing properties, only adds approved new ones (or maps onto existing ones).
- **Performance**: bulk operations run as background jobs with batching, throttling, and resumability; event-driven curation runs through Automate's execution pipeline rather than inline on save, so editors never wait on AI calls.
- **Concurrency & idempotency**: re-running a ruleset over already-curated media is a no-op for items already in place; handle simultaneous runs racing to create the same folder.
- **Conflict policy**: nearest-ancestor scoping should prevent double-claims, but defensively the deeper scope wins; ambiguity is logged.
- **Folder hygiene**: optional setting to clean up emptied folders after a run.
- **Multi-environment**: rulesets stored as configuration-friendly data (uSync-compatible serialization) so rules travel between environments; provisioned schema flows through uSync/Deploy as ordinary media type changes; activity log stays environment-local.
- **Load-balanced setups**: background processing elects a single worker (main-dom / scheduling-server awareness).
- **Classification data licensing**: embed only public-domain or license-free scheme data (public-domain Dewey levels, LCC outline); vet the license of every additional open taxonomy before inclusion; keep scheme data in replaceable resource files.
- **Pre-release dependency risk**: `Umbricians.MediaCurator.Automate` tracks Umbraco.Automate's pre-release API and is versioned/released independently of the core so Automate API churn never blocks core releases.
- **Licensing/distribution**: open source (MIT), NuGet with `umbraco-marketplace` tag, dependency on `Umbraco.Cms.*` 17+ and the Umbraco.AI abstractions.

## 14. Phasing

**Phase 1 — Core engine (MVP)**
Provider model, scoped rulesets (single-level rules), property requirement check + consent + provisioning flow, Date + EXIF providers with full settings UI, image-only filtering (configurable media types/file property), "curate now", dry-run preview, activity log, localization plumbing.

**Phase 2 — AI + visual designer**
Recognition pipeline on Umbraco.AI, AI Tag provider, Color provider, the visual workflow-style ruleset designer (nesting + conditional branches, Automate-style UX), background bulk runs.

**Phase 3 — Classification, automation & polish**
Classification provider (public-domain Dewey + LCC + TGM genre/format, web asset role, custom tables, pluggable schemes), `Umbricians.MediaCurator.Automate` companion package (triggers + actions, tracking Automate toward its official release), rule nesting GA, remaining suggested providers, undo, uSync support, exclusions/pinning, health dashboard.

## 15. Future Directions (post-v1)

- **AI-suggested rules** — analyze the library and propose new rules ("400 untagged screenshots — create a Screenshots rule?"). Agreed as a goal, deliberately deferred.
- **Virtual views / smart folders** — rule-driven *views* over the library without physically moving items, so editors can find images in different ways irrespective of folder structure. Could reuse the same providers as query predicates rather than move targets.
- **Additional open classification schemes** — IPTC Media Topics, Open Images/COCO label sets, Wikidata-derived lists (license-vetted per scheme).
- **Non-image media** support; **naming strategies** for renaming items; **duplicate detection**.
- **Automate canvas adoption** — migrate the designer onto the official Automate canvas components if/when HQ publishes them as reusable.

## 16. Open Questions

None currently — all questions raised during scoping have been resolved. Key decisions are recorded inline; for reference:

- Partial property matches: consent dialog offers **both** mapping onto the existing property and creating alongside (§7).
- Uninstall: schema and data are **always left untouched**; removal is a manual administrative task (§7).
- Umbraco.Automate: no formal release-tracking process needed — the `Umbricians.MediaCurator.Automate` companion package is simply built against the current API and updated as part of normal development when Automate officially ships (§9).
- Minimum version Umbraco 17; images only in v1 (configurable media types and authoritative file property); folder names localized; visual designer replicates the Automate workflow UX; classification schemes limited to public-domain/license-free data with a pluggable scheme model.
