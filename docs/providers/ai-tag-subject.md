# AI tag and subject provider

The AI Tag / Subject provider sorts media by recognition tags from Umbraco.AI. It works well when folder choices should follow image content rather than metadata.

## Provider details

- Name: `AI Tag / Subject`
- Alias: `Umbricians.MediaCurator.AiTag`
- Source file: `src/Umbricians.MediaCurator/Providers/AiTagProvider.cs`
- Property requirement: `mediaCuratorTags`

## Settings

- `mappings`: Optional tag mappings, one per line in `tag=Folder Name` format. If empty, the selected tag becomes the folder name.
- `threshold`: Minimum confidence from `0` to `1`. The default is `0.6`.
- `mappedOnly`: When `true`, unmapped tags are ignored.

## Behavior

The provider asks the recognition service for tags, filters out tags below the confidence threshold, and picks the highest-confidence candidate. Mapping order breaks ties when confidence values match.

If the chosen tag has a mapping, the mapped folder name is used. If it has no mapping and `mappedOnly` is off, the tag name is used as the folder name. If recognition is unavailable or no tag qualifies, the provider returns unresolved.

