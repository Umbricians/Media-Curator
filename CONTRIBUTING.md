# Contributing

How the Umbricians team works on Umbricians Media Curator. Contributions come from the team; whether outside
contributions are accepted is decided when the repository is made public, and this page says so then.

## Branches

The repository uses Gitflow:

- `develop` is the default branch and holds the next release.
- Work happens on a `feature/…` branch cut from `develop`, and goes back to `develop` through a pull request.
- `main` only changes through a `release/x.y.z` or `hotfix/x.y.z` pull request, and every version is tagged there.

Open your pull request against `develop`. Larger changes start as an issue saying what and why, with "Done when"
criteria the pull request is checked against.

## Building and testing

Run the steps the `build` check runs before opening a pull request. These build Umbraco 17, the default:

```bash
node --test "build/*.test.mjs"
cd src/Umbricians.MediaCurator/Client && npm ci && npm test && npm run build && cd -
dotnet build Umbricians.MediaCurator.slnx -c Release
dotnet test Umbricians.MediaCurator.slnx -c Release --no-build
node build/smoke-test.mjs demo/Umbricians.MediaCurator.Demo /App_Plugins/UmbriciansMediaCurator/umbricians-media-curator.js umbricians-media-curator 17 "Umbricians Media Curator"
dotnet pack src/Umbricians.MediaCurator -c Release -o artifacts -p:Version=$(node build/package-version.mjs Umbricians.MediaCurator 17 $(dotnet msbuild src/Umbricians.MediaCurator -getProperty:UmbracoVersion -p:UmbracoMajor=17)) -p:LastReleaseVersion=$(node build/package-version.mjs Umbricians.MediaCurator 17 $(dotnet msbuild src/Umbricians.MediaCurator -getProperty:UmbracoVersion -p:UmbracoMajor=17) --baseline)
```

Each Umbraco major is its own package, built from the same source (see [docs/RELEASING.md](docs/RELEASING.md)).
Build and test another major with `-p:UmbracoMajor=18` or `-p:UmbracoMajor=19` on every `dotnet` command, and pass the
major to the smoke test and the version script:

```bash
dotnet build Umbricians.MediaCurator.slnx -c Release -p:UmbracoMajor=18
dotnet test Umbricians.MediaCurator.slnx -c Release --no-build -p:UmbracoMajor=18
node build/smoke-test.mjs demo/Umbricians.MediaCurator.Demo /App_Plugins/UmbriciansMediaCurator/umbricians-media-curator.js umbricians-media-curator 18 "Umbricians Media Curator"
dotnet pack src/Umbricians.MediaCurator -c Release -p:UmbracoMajor=18 -o artifacts -p:Version=$(node build/package-version.mjs Umbricians.MediaCurator 18 $(dotnet msbuild src/Umbricians.MediaCurator -getProperty:UmbracoVersion -p:UmbracoMajor=18)) -p:LastReleaseVersion=$(node build/package-version.mjs Umbricians.MediaCurator 18 $(dotnet msbuild src/Umbricians.MediaCurator -getProperty:UmbracoVersion -p:UmbracoMajor=18) --baseline)
```

The pack checks the public API against the last release of the same Umbraco major, so it is packed with the version
CI uses, which comes after it, and with that release as `LastReleaseVersion` (the version script needs the release
tags, which a clone fetches, and reads the published versions from nuget.org). Differences a change is allowed to
make go in that major's `src/Umbricians.MediaCurator/CompatibilitySuppressions.<major>.xml`.

Umbraco 17 and 18 run on .NET 10, and 19 needs the .NET 11 SDK. Each major has its own folders under `bin` and `obj`,
such as `bin/umbraco18/`, so switching majors never reuses another's build. CI also builds the client against each
major's own `@umbraco-cms/backoffice`; to do the same, run `npm install --no-save @umbraco-cms/backoffice@18.3.2` (the
major's `UmbracoVersion` in `Directory.Build.props`) before `npm test` and `npm run build`, and `npm ci` to go back.

The smoke test installs the demo on a new database of its own each run. `dotnet run` on the demo uses the demo's own
database, which Umbraco upgrades to whichever major ran it last and then won't open on an older one: delete
`demo/Umbricians.MediaCurator.Demo/umbraco/Data` to go back to an older major.

Git Bash on Windows rewrites arguments that start with `/`, such as the bundle path, into Windows paths. Run the
smoke test there with `MSYS_NO_PATHCONV=1` in front, or from PowerShell.

`build/*.test.mjs` are the tests for the build scripts, which decide the published version, the README nuget.org
shows and the options each tag's GitHub release gets, and `build/check-package.mjs`, which CI runs on each packed
`.nupkg`: its version, its Umbraco range, no pre-release dependency in a stable package, and its README, icon and
bundle. The version tests need git on the path.

`npm run build` ends by checking the built bundle with `scripts/check-bundle.mjs`, and fails naming each problem: the
bundle entry exporting more than `manifests`, a backoffice module bundled instead of left external, a decorated field
emitted as a class field, or a decorator left uncompiled. It also fails when it has nothing to check: no source maps,
or no decorated fields in the build while `src/` has some.

## Pull requests

Fill in the template: a summary of what changed, the evidence it works, and the merge danger. Link the issue it
closes with "Closes #N".
