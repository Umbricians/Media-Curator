# Classification provider

The Classification provider sorts media into hierarchical folders from a classification code. It supports built-in schemes and custom code tables. Schemes can classify an image by its subject (Dewey, LCC), by what kind of picture it is (TGM genre/format) or by what it is for on a website (web asset role).

## Provider details

- Name: `Classification` (named `Library Classification` before; only the display name changed, existing rulesets keep working because rules store the alias)
- Alias: `Umbricians.MediaCurator.Classification`
- Source file: `src/Umbricians.MediaCurator/Providers/ClassificationProvider.cs`
- Property requirement: `mediaCuratorClassificationCode`

## Settings

- `scheme`: Classification scheme to use. Built-in schemes come from the registered scheme collection. `custom` uses the custom table setting.
- `source`: Code source. Use `property` for `mediaCuratorClassificationCode` or `filename` for the first filename token.
- `naming`: Folder naming style. Use `code`, `name`, or `codeName`.
- `customTable`: Used with the custom scheme. Add one mapping per line in `code=Folder/Sub Folder` format.

## Built-in schemes

Only public-domain or licence-free scheme data is embedded. Each scheme is an embedded `code|name|parentCode` file in `src/Umbricians.MediaCurator/Schemes/Resources`.

| Alias | Name | Classifies by | Size |
| --- | --- | --- | --- |
| `dewey-pd` | Dewey (public domain levels) | Subject | 10 classes, 100 divisions |
| `lcc` | Library of Congress Classification (outline) | Subject | Classes and selected subclasses |
| `tgm-genre-format` | Thesaurus for Graphic Materials (genre/format) | Kind of picture | About 750 terms, up to 6 levels |
| `web-asset-role` | Web asset role | Purpose on a website | 7 groups, 22 roles |

### Web asset role

MediaCurator's own scheme, describing what an image is for on a website:

- `BKG` Backgrounds: `BKG1` Background or texture, `BKG2` Pattern
- `BRD` Branding: `BRD1` Logo, `BRD2` Icon, `BRD3` Favicon or app icon
- `EDT` Editorial: `EDT1` Article photo, `EDT2` Illustration, `EDT3` Stock or concept photo
- `INF` Information: `INF1` Chart or infographic, `INF2` Diagram, `INF3` Screenshot, `INF4` Map, `INF5` Document scan
- `MKT` Marketing: `MKT1` Hero or banner, `MKT2` Promotional graphic, `MKT3` Social media image
- `PPL` People: `PPL1` Headshot or portrait, `PPL2` Team or group photo, `PPL3` Event photo
- `PRD` Products: `PRD1` Product shot, `PRD2` Product in use, `PRD3` Product detail

Codes contain no spaces, dashes, underscores or dots, so they work with the `filename` source: `BRD1 acme logo.png` resolves to Branding/Logo. Top-level codes are deliberately not English words, so a name such as `in-store.jpg` is not mistaken for a code.

### Thesaurus for Graphic Materials (genre/format)

The genre/format terms of the Library of Congress [Thesaurus for Graphic Materials](https://id.loc.gov/vocabulary/graphicMaterials) (TGM): photographs, posters, drawings, maps, postcards and so on. TGM is a work of the United States government and is in the public domain in the United States.

- Codes are TGM identifiers, for example `tgm007721` (Photographs). A file named `tgm007721 harbour.jpg` resolves with the `filename` source.
- The data is generated from the official bulk download (`https://id.loc.gov/download/vocabulary/graphicMaterials.madsrdf.nt.gz`) by `tools/schemes/build_tgm_genre_format.py`. Re-run it to refresh the file; do not edit the resource by hand.
- A term is included when its record says it is applied as a genre/format term (MARC 155/655), including terms that are also subject terms, such as Photographs.
- TGM is polyhierarchical, but the scheme needs one parent per code. Only broader links between genre/format terms are kept; a term's parent is its broader term closest to a top term (ties go to the alphabetically first name, then the lowest identifier). A parent is always shallower than its child, so the hierarchy has no cycles.
- Level-by-level AI decisions go at most four levels deep, so the few terms deeper than that are only chosen by the single-call method or set through the code property or the filename.

## AI decisions

When the code comes from AI recognition, the image is first described and tagged, then a code is chosen from that description (unless the single-call method is selected). Each scheme tells the decision what to classify by: subject schemes classify what the image depicts, TGM classifies what kind of picture it is, and web asset role classifies what the image is for. With the default method, schemes with up to 255 final codes (such as web asset role) are decided in one step; larger ones (such as TGM) are decided level by level.

## Behavior

For built-in schemes, the provider resolves the code to a hierarchy and returns each level as a folder segment. For custom tables, the matched table row decides the path.

When `source` is `property`, the provider first reads `mediaCuratorClassificationCode`. If no code exists and recognition is available, it can ask recognition to populate the code for non-custom schemes. When `source` is `filename`, the first filename token before a space, dash, underscore, or dot is used.

If the code is missing, the scheme cannot resolve it, or no custom table row matches, the provider returns unresolved.
