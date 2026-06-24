# Filename convention provider

The Filename Convention provider extracts a folder segment from the media item name with a .NET regular expression.

## Provider details

- Name: `Filename Convention`
- Alias: `Umbricians.MediaCurator.Filename`
- Source file: `src/Umbricians.MediaCurator/Providers/FilenameConventionProvider.cs`
- Property requirements: none

## Settings

- `pattern`: .NET regular expression used against the media name. The default is `^([A-Za-z]+-\d+)`.

## Behavior

The provider matches the configured pattern against the media name. If the regex has a first capture group, that group becomes the folder name. Otherwise, the whole match becomes the folder name.

Invalid patterns, regex timeouts, empty names, and non-matches return unresolved.

