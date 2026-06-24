# Library classification provider

The Library Classification provider sorts media into hierarchical folders from a classification code. It supports built-in schemes and custom code tables.

## Provider details

- Name: `Library Classification`
- Alias: `Umbricians.MediaCurator.Classification`
- Source file: `src/Umbricians.MediaCurator/Providers/ClassificationProvider.cs`
- Property requirement: `mediaCuratorClassificationCode`

## Settings

- `scheme`: Classification scheme to use. Built-in schemes come from the registered scheme collection. `custom` uses the custom table setting.
- `source`: Code source. Use `property` for `mediaCuratorClassificationCode` or `filename` for the first filename token.
- `naming`: Folder naming style. Use `code`, `name`, or `codeName`.
- `customTable`: Used with the custom scheme. Add one mapping per line in `code=Folder/Sub Folder` format.

## Behavior

For built-in schemes, the provider resolves the code to a hierarchy and returns each level as a folder segment. For custom tables, the matched table row decides the path.

When `source` is `property`, the provider first reads `mediaCuratorClassificationCode`. If no code exists and recognition is available, it can ask recognition to populate the code for non-custom schemes. When `source` is `filename`, the first filename token before a space, dash, underscore, or dot is used.

If the code is missing, the scheme cannot resolve it, or no custom table row matches, the provider returns unresolved.

