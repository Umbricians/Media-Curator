# People provider

The People provider sorts images by whether the AI decided they show people. See [People detection](../people-detection.md)
for how the decision is made and stored.

## Provider details

- Name: `People`
- Alias: `Umbricians.MediaCurator.People`
- Source file: `src/Umbricians.MediaCurator/People/PeopleProvider.cs`
- Property requirements: none (uses the recognition cache)

## Settings

- `people`: Folder name for images that show people. The default is `People`.
- `noPeople`: Folder name for images that do not. The default is `No people`.

## Behavior

The provider runs image recognition (or reuses the stored result), then uses the stored people decision when it still
describes the image's file. Otherwise it decides from the image's description and stores the answer, which also
updates the media tree marks.

The resolved value is `people` or `no-people`, for conditions on child rules.

The provider returns unresolved when AI is off, recognition is unavailable, or no decision could be made.

The provider works whether or not **Detect people** is on in the Setup; that setting controls detection during image
analysis and whether the media tree shows the marks.
