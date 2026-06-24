# Alphabetical provider

The Alphabetical provider sorts media into A to Z buckets using the first character of the media item name.

## Provider details

- Name: `Alphabetical`
- Alias: `Umbricians.MediaCurator.Alphabetical`
- Source file: `src/Umbricians.MediaCurator/Providers/AlphabeticalProvider.cs`
- Property requirements: none

## Settings

- `otherBucket`: Folder name for items whose names do not start with a letter. The default is `#`.

## Behavior

The provider trims the media name and checks the first character. Letter names use the uppercase first letter in the ruleset culture. Names that start with a non-letter use the configured fallback bucket.

If the media name is missing or empty, the provider returns unresolved.

