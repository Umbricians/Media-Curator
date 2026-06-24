# Image format provider

The Image Format provider sorts media by filename extension into configurable format groups.

## Provider details

- Name: `Image Format`
- Alias: `Umbricians.MediaCurator.Format`
- Source file: `src/Umbricians.MediaCurator/Providers/ImageFormatProvider.cs`
- Property requirements: none

## Settings

- `jpeg`: Folder name for `jpg`, `jpeg`, and `jfif`. The default is `Photos`.
- `png`: Folder name for `png`. The default is `PNG`.
- `svg`: Folder name for `svg`. The default is `Vectors`.
- `gif`: Folder name for `gif` and `apng`. The default is `Animated`.
- `modern`: Folder name for `webp`, `avif`, and `heic`. The default is `Modern`.
- `other`: Folder name for every other extension. The default is `Other`.

## Behavior

The provider reads the extension from the media name, chooses the matching setting, and returns the configured folder name.

If the media name has no extension, the provider returns unresolved.

