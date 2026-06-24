# Color provider

The Color provider sorts images by dominant or average color, then snaps the extracted color to a named palette entry.

## Provider details

- Name: `Color`
- Alias: `Umbricians.MediaCurator.Color`
- Source file: `src/Umbricians.MediaCurator/Providers/ColorProvider.cs`
- Property requirements: none

## Settings

- `palette`: Named colors, one per line in `Name=#hex` format. The default palette contains common color names such as `Red`, `Blue`, `Black`, and `White`.
- `mode`: Color extraction mode. Use `dominant` or `average`. The default is `dominant`.

## Behavior

The provider opens the image, scales it down for faster analysis, extracts a color, and finds the nearest palette entry. The palette entry name becomes the folder name, so folders use names like `Blue` or `Brand Red` instead of raw hex values.

If the image cannot be opened, the palette is empty, or color extraction fails, the provider returns unresolved.

