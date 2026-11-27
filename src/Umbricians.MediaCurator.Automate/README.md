# Umbricians Media Curator Automate

Adds [Media Curator](https://www.nuget.org/packages/Umbricians.MediaCurator) triggers and actions to
[Umbraco.Automate](https://www.nuget.org/packages/Umbraco.Automate) workflows, so curation can run as part of a
workflow, such as sorting each image as it is uploaded.

## Installation

The site needs Umbraco.Automate. This package brings Media Curator with it.

```bash
dotnet add package Umbricians.MediaCurator.Automate
```

Restart the site. The triggers and actions appear in the Automate workflow editor.

## Triggers

| Trigger | Fires when | Settings |
| --- | --- | --- |
| Media curated | a curation run finishes | Scope folder key: only runs on this folder (empty for all) |
| Media curation failed | a curation run finishes with failed items | Scope folder key, as above |

Both output the run's scope folder, ruleset and run keys, the counts of moved, already-in-place and failed items, and
what started the run.

## Actions

| Action | What it does | Outputs |
| --- | --- | --- |
| Analyze image (Media Curator) | Runs AI recognition on a media item, optionally even when it was analysed recently, with an optional classification scheme | whether it was analysed, its description, tags and classification code |
| Categorize media (Media Curator) | Moves a media item to the folder its ruleset gives it, or with Dry run only works the folder out | whether it moved, and the target path |
| Curate folder (Media Curator) | Runs a folder's ruleset over the folder, optionally including subfolders, as a dry run or for real | planned, moved and failed counts, folders removed and the run key |

A real Curate folder run removes the folders it leaves empty, to the Recycle Bin unless *Permanently delete empty
folders* is set.

## More

See the [Media Curator documentation](https://github.com/Umbricians/Media-Curator#readme) for rulesets, providers and
configuration.

## Licence

MIT. Copyright (c) 2026 FYIN LLC (trading as Umbricians).
