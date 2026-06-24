# Dimensions and orientation provider

The Dimensions / Orientation provider sorts images into landscape, portrait, or square folders based on image dimensions.

## Provider details

- Name: `Dimensions / Orientation`
- Alias: `Umbricians.MediaCurator.Dimensions`
- Source file: `src/Umbricians.MediaCurator/Providers/DimensionsProvider.cs`
- Property requirements: none

## Settings

- `landscape`: Folder name for landscape images. The default is `Landscape`.
- `portrait`: Folder name for portrait images. The default is `Portrait`.
- `square`: Folder name for square images. The default is `Square`.
- `squareTolerance`: Percentage tolerance for treating an image as square. The default is `5`.

## Behavior

The provider reads the image dimensions and compares width and height. If the difference is within the configured square tolerance, the square folder is used. Otherwise, wider images go to the landscape folder and taller images go to the portrait folder.

If the image cannot be opened or dimensions cannot be read, the provider returns unresolved.

