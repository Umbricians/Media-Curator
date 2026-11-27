# Glossary

The words this codebase uses for its domain. Code, docs and reviews should use them as defined here.

## Activity log

The record of curation runs, from which a run can be undone. It stays in its own environment and doesn't travel with
rulesets.

## Background run

A curation run that the server works through outside the request, used for folders of more than 100 images. It has no
preview.

## Classification scheme

A taxonomy of codes, such as Dewey or LCC, that the Classification provider can assign. Not a site setting: each
Classification rule chooses its own.

## Curate

To move images into the folders their ruleset works out. Never renames an image or changes its file.

## Enricher

A step that runs after AI analysis and can adjust the tags and description before they are saved.

## Exclusion

An image marked to be left where it is, whatever the rules say.

## Plan

The list of moves a run would make, shown as the preview before anything moves.

## Provider

A curation provider: the code behind a rule, which works out a folder for one image. Not an AI provider, which is
configured in Umbraco.AI.

## Provisioning

Adding the media type properties that a provider requires, only after a user has approved them.

## Recognition

Analysing an image with AI to get a description and tags. Results are stored per image.

## Requirement

A media type property that a provider needs in order to work.

## Rule

One step of a ruleset: a provider with its settings, adding one or more folder levels. Child rules can depend on the
parent's value.

## Ruleset

The rules attached to a scope folder, which together decide the folder path for each image below it.

## Scope folder

The media folder a ruleset is attached to. The nearest scope folder above an image decides which ruleset applies.
