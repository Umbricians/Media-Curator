# Date folders provider

The Date Folders provider sorts media into date-based folder paths such as `2026/06` or `2026/June`.

## Provider details

- Name: `Date Folders`
- Alias: `Umbricians.MediaCurator.Date`
- Source file: `src/Umbricians.MediaCurator/Providers/DateFolderProvider.cs`
- Property requirements: none

## Settings

- `format`: Date format used to build the folder path. Each `/` creates another folder level. The default is `yyyy/MM`.
- `source`: Date value to use. Choose `createDate` for the upload date or `updateDate` for the last updated date.

## Behavior

The provider splits the configured format on `/`, formats each part with the ruleset culture, and returns the formatted parts as folder segments.

If the selected date is missing, the format is invalid, or the format produces empty segments, the provider returns unresolved so rule fallback behavior can decide what happens next.

