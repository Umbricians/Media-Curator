# Date folders provider

The Date Folders provider sorts media into date-based folder paths such as `2026/06` or `2026/June`.

## Provider details

- Name: `Date Folders`
- Alias: `Umbricians.MediaCurator.Date`
- Source file: `src/Umbricians.MediaCurator/Providers/DateFolderProvider.cs`
- Property requirements: none

## Settings

- `format`: Date format used to build the folder path. Each `/` creates another folder level. The default is `yyyy/MM`.
- `source`: Date value to use. Choose `createDate` for the upload date, `updateDate` for the last updated date, or
  `dateTaken` for the date the photo was taken.

## Behavior

The provider splits the configured format on `/`, formats each part with the ruleset culture, and returns the formatted parts as folder segments.

With `dateTaken`, the date comes from the photo's EXIF data (`DateTimeOriginal`), so photos are filed by when they
were taken rather than when someone uploaded them. The date is used as the camera recorded it, in the camera's own
time, with no time zone applied. Images without a capture date, such as screenshots, graphics and photos whose EXIF
data was removed, use the upload date instead, as do photos from cameras whose clock was never set.

If the selected date is missing, the format is invalid, or the format produces empty segments, the provider returns unresolved so rule fallback behavior can decide what happens next.

