# Getting started

This guide takes you from installing Media Curator to your first curated folder, and lists what to check before the
site goes live.

## Requirements

- Umbraco 17.8.2 or later, or 18.3.2 or later. Umbraco 19 release candidates have pre-release packages.
- Access to the Settings section. Every Media Curator screen is there, and it adds no permissions of its own.
- For AI providers only: [Umbraco.AI](https://www.nuget.org/packages/Umbraco.AI) with a configured profile. Date, EXIF,
  dimensions, format, filename and alphabetical rules need no AI.

## 1. Install the package

```bash
dotnet add package Umbricians.MediaCurator
```

Restart the site. Media Curator's database tables are created on startup.

## 2. Create a ruleset

1. Open **Settings › Media Curator**.
2. Create a ruleset and pick the media folder it applies to. A ruleset covers everything below that folder, and the
   nearest ruleset above an image is the one that applies.
3. Add rules in the designer, for example Date with the format `yyyy/MM`. Each rule adds one or more folder levels.

## 3. Approve any properties

Open the ruleset's **Requirements** view. Some providers store values on media types, and Media Curator adds those
properties only after you approve them.

## 4. Curate

Open the ruleset's **Curate** view. The preview shows where each image would go, and nothing moves until you confirm.
On a folder with more than 100 images, at any depth, **Curate images** skips the preview and runs in the background.

## 5. Undo if you need to

**Settings › Media Curator › Activity log** lists every run and can undo one.

## Using AI

In **Settings › Media Curator › Setup**, choose the Umbraco.AI profile for describing images. AI can be switched off
there entirely. To use TypeSafe's Jev for classification decisions, select it as the decision engine and enter a key,
or set `Umbricians:MediaCurator:Secrets:TypeSafeApiKey` in server configuration.

## Before you go live

- Try each ruleset's preview on a copy of the real media, and check the folder names.
- Check the AI profile's cost and limits against the size of your library, and the number of images analyzed at once.
- Keep any TypeSafe API key in server configuration or a secret store rather than in source control.
- Decide who has access to the Settings section, since that is what controls Media Curator.
- If you use several environments, move rulesets between them with the export and import endpoints.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| An image doesn't move. | It already sits in the right folder, it is excluded, or no ruleset applies above it. | Check the preview, the exclusions and the ruleset's folder. |
| "Curate images" shows no preview. | The folder holds more than 100 images, so it runs in the background. | Follow its progress in the notification or the activity log. |
| AI rules resolve nothing. | AI is off, or no Umbraco.AI profile is chosen. | Check **Setup**. |
| The TypeSafe key field is locked. | The key is set in server configuration, which wins. | Change it there. |
