# EXIF value provider

The EXIF Value provider sorts media by a selected EXIF field, such as camera make, camera model, lens model, ISO, aperture, exposure time, or focal length.

## Provider details

- Name: `EXIF Value`
- Alias: `Umbricians.MediaCurator.Exif`
- Source file: `src/Umbricians.MediaCurator/Providers/ExifValueProvider.cs`
- Property requirement: `mediaCuratorExifData`

## Settings

- `tag`: EXIF field to read. The default is `Make`.
- `mappings`: Optional value mappings, one per line in `rawValue=Folder Name` format.

## Behavior

The provider reads the selected EXIF value from the curation context. If a mapping matches the raw value, the mapped folder name is used. If no mapping matches, the raw EXIF value becomes the folder name.

If the EXIF value is missing or blank, the provider returns unresolved. The optional `mediaCuratorExifData` property lets MediaCurator cache extracted EXIF values instead of reading the file on every run.

