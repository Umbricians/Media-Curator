# Releasing

For maintainers. The repository uses Gitflow: `develop` holds the next release, and `main` only changes through
release and hotfix pull requests. [`.github/workflows/build.yml`](../.github/workflows/build.yml) builds and packs
every push to `main` and `develop` and every pull request. A version tag on `main` publishes to NuGet, and so does a
pre-release tag on a `release/*` branch.

## One source, one release per Umbraco major

One source builds separate NuGet packages for each Umbraco major the package supports: 17, 18 and 19. The package's
major is the Umbraco major, so `17.2.3` is for Umbraco 17 and `18.2.3` for Umbraco 18. `-p:UmbracoMajor=18` chooses
the Umbraco version, the .NET version and the build folders (see [`Directory.Build.props`](../Directory.Build.props));
the default is 17.

Each release is two packages with the same version: `Umbricians.MediaCurator`, and `Umbricians.MediaCurator.Automate`,
which adds Media Curator's triggers and actions to Umbraco.Automate. The Automate package depends on the same release
of Media Curator or a later one of the same major. One tag releases both, and the version rules below go by Media
Curator's releases, so the Automate package's versions start at whichever release first includes it.

Umbricians supports the current Umbraco LTS (17) and every major after it. When the next LTS ships, we decide how long
the older majors stay supported, and may drop the majors that aren't LTS then.

On a pull request or a push to `main` or `develop`, the workflow builds every major as its own job, named
`build (Umbraco 17)`, `build (Umbraco 18)` and so on. A job named `build` follows them and fails unless all of them
passed. That aggregate `build` is the required status check, so the rulesets never name a major.

A tag builds and publishes only its own major: `v18.2.3` publishes `18.2.3` and runs only the Umbraco 18 job. A tag
for a major the package doesn't support fails the build. A release is a version nuget.org has; a tag whose build
failed or whose deployment was rejected isn't one, but its number is used up. A tag must be the next release of its
major: the next patch or minor after the major's last release (`v18.2.1` or `v18.3.0` after `v18.2.0`) or after a
later tag that never published, or `vN.0.0` for a major's first. A pre-release tag such as `v19.0.0-rc.1` publishes
a pre-release, and must lead up to such a release. Any other tag fails the build, so a skipped number does, and so does
a mistyped major unless the version it names happens to be that major's next release. A tag the rule refused stays
(tags are never moved) but doesn't open the way to the numbers after it. A tag also fails for a version nuget.org
already has, unless the run is a re-run, and a stable tag fails on a commit that already carries a published release
of its major, such as the previous release's merge commit when step 3 was skipped; a tag that never published doesn't
count, so the next number can go on the same commit. A stable tag also fails while the major's Umbraco version in
`Directory.Build.props` is a pre-release, since a stable package can't depend on an Umbraco release candidate. Only
the packages in `src/` are packed; the demo site is built and smoke-tested but never published, and each package is
checked before it can be (`build/check-package.mjs`): its version, that its Umbraco dependencies stop before the next
major (and the Automate package's dependency on Media Curator), that a stable package depends on no pre-release, and
that it carries its README, icon and backoffice bundle. Once a package is on NuGet, the run creates a matching GitHub release with generated notes and the
`.nupkg` and `.snupkg` attached. The notes start at the previous stable release of the same major, and only a
release of the newest Umbraco major becomes the repository's Latest release, so a 17.x hotfix after 18.x doesn't take
it.

The pack checks each package's public API against that package's last version of the major on nuget.org, and fails
on a breaking change, so breaking changes wait for a new Umbraco major. Before a package's first release of a major
there is nothing to check against. Differences a change is allowed to make go in that package's suppressions file for
the major, `CompatibilitySuppressions.<major>.xml` in its project folder.

The weekly [Umbraco minors](../.github/workflows/umbraco-minors.yml) workflow builds each major against the newest
Umbraco release of that major, since a minor can still break backoffice code. It never publishes. When it fails, fix
the package and release it like any change.

## A release

One release is one tag per supported major, all on the same commit and with the same minor and patch: `v17.2.0`,
`v18.2.0` and `v19.2.0`. Each tag is a separate run and needs its own approval of `production`. The release branch is
named after its 17.x version.

1. Cut the release branch from an up-to-date `develop`:

   ```bash
   git checkout develop && git pull && git checkout -b release/17.2.0
   ```

2. Push it, then open a pull request from `release/17.2.0` into `main` with the `release-flow` label. Only release
   fixes go on this branch.
3. Merge it with a merge commit (not squash) once the `build` check passes.
4. Tag the merge commit on `main` once per major, and push the tags. A major that is still on Umbraco release
   candidates (19 for now) gets no tag here: tag it on the release branch before step 3, as
   [a pre-release](#a-pre-release).

   ```bash
   git checkout main && git pull
   for major in 17 18 19; do git tag -a "v$major.2.0" -m "v$major.2.0"; done
   ```

   ```bash
   git push origin v17.2.0 v18.2.0 v19.2.0
   ```

   Pushing several tags at once may start only some of the runs. Check there is one run per tag, and push any
   missing tag again on its own. Each run's release job decides Latest from the releases that exist when it runs, so
   tags pushed together can each make their release Latest, and the last to finish wins. Push the older majors'
   tags first, or check afterwards that the newest major's release is Latest on the releases page.
5. In each run, open **Review deployments** and approve `production`.
6. Check each publish log says the package was pushed, not skipped as a duplicate, and that each GitHub release has
   its `.nupkg` attached. nuget.org lists the packages a few minutes later, after validation.
7. Merge `main` back into `develop` through a pull request with the `release-flow` label.
8. In that back-merge, delete every `<Suppression>` from the suppressions file of each major you tagged
   (`src/Umbricians.MediaCurator/CompatibilitySuppressions.17.xml` for a `v17` tag), and leave the other majors' files
   alone: their suppressions still allow differences from their own last release. The next release of a tagged
   major is checked against this one, so the suppressions left until this merge are no longer needed (the pack
   allows unneeded ones, so `main` and `develop` keep building until then). If the merge into `develop` conflicts
   on a suppressions file, keep any suppressions `develop` added since the release.

Umbraco 19 stays a pre-release until Umbraco 19.0.0 is out, so until then leave `v19.x.y` out of step 4 and tag it
as `v19.N.P-rc.M` on the release branch before it merges, as in the first release below.

## The first release

The first release is `17.0.0`. There is no 0.x or 1.0. Until Umbraco 19.0.0 is out, `UmbracoVersion` for 19 in
`Directory.Build.props` is a release candidate, and its package is a pre-release.

1. Cut `release/17.0.0` from `develop`, push it and open the pull request into `main` as above. Don't merge it yet.
2. Tag the head of `release/17.0.0` as `v19.0.0-rc.1` and push the tag. A pre-release tag must be on a `release/*`
   branch, which is why it is tagged before the merge.

   ```bash
   git checkout release/17.0.0 && git pull && git tag -a v19.0.0-rc.1 -m "v19.0.0-rc.1"
   ```

   ```bash
   git push origin v19.0.0-rc.1
   ```

3. Approve `production` in its run, and check the NuGet pre-release and the GitHub pre-release.
4. Merge the pull request with a merge commit once the `build` check passes.
5. Tag the merge commit on `main` as `v17.0.0` and `v18.0.0`, and push both tags:

   ```bash
   git checkout main && git pull && git tag -a v17.0.0 -m "v17.0.0" && git tag -a v18.0.0 -m "v18.0.0"
   ```

   ```bash
   git push origin v17.0.0 v18.0.0
   ```

6. Approve `production` in each run, check the packages on NuGet, and merge `main` back into `develop`, as in
   steps 5 to 8 of a release.

Once Umbraco 19.0.0 is out and the next section is done, every release tags all three majors on `main`.

## Umbraco 19.0.0

When Umbraco 19.0.0 is out:

1. In `Directory.Build.props`, change `UmbracoVersion` for 19 to `19.0.0`. Release it through `develop` like any
   change.
2. Tag `v19.N.P` on `main` with the release's other tags, as in a release. It is a stable release, so it must be on
   `main`. Its notes start at the previous stable `v19.` release, if there is one.

## A hotfix

Cut `hotfix/17.2.1` from `main`, fix it there, and open a pull request into `main` with the `release-flow` label.
Then follow steps 3 to 8 of a release with the hotfix version, tagging every major the fix applies to (a fix that only
affects one major can release just that major's tag).

A major still on Umbraco release candidates has no hotfix: its tags are pre-releases, which only build on a
`release/*` branch, so its fix goes out with the next release's pre-release.

A tag always runs the workflow file at its own commit, so a workflow bug found while releasing can't be fixed by
re-running the jobs. Fix it through a hotfix pull request before the next tag, and publish the stuck version by hand.

## A pre-release

To publish a pre-release from a release branch before it merges, tag a commit on it with a suffix and push the tag.
It builds only that tag's major, and its version before the suffix must be that major's next release:

```bash
git checkout release/17.2.0 && git pull && git tag -a v18.2.0-beta.1 -m "v18.2.0-beta.1"
```

```bash
git push origin v18.2.0-beta.1
```

Then follow steps 5 and 6 of a release. It publishes a NuGet pre-release and a GitHub pre-release, and nothing merges
back.

A release tag that isn't on `main`, or a pre-release tag that isn't on a `release/*` branch, fails the build and
never publishes. If a build fails on its tag, fix it through a hotfix and release the next version number; a version
is never reused, and a tag is never moved.

nuget.org keeps the README each version was published with, so README changes reach the package page with the
next release.

## Adding an Umbraco major

When a new Umbraco major comes (Umbraco 20, say), add it in these places:

1. `Directory.Build.props`: one more `PropertyGroup` with its lowest `UmbracoVersion` and target framework, an
   `UMBRACO_20_OR_GREATER` symbol, and the majors named in the `CheckUmbracoMajor` error.
2. `src/Umbricians.MediaCurator/CompatibilitySuppressions.20.xml`, copied from another major's file with its
   suppressions deleted.
3. The `plan` job in `.github/workflows/build.yml`: one more entry with its major and .NET SDK.
4. The `plan` job in `.github/workflows/umbraco-minors.yml`: the same entry.
5. The README's installation table, the requirements in `docs/getting-started.md`, and the majors named in this
   document and in the workflows' header comments.
6. The `umbraco-v20` topic on the GitHub repository.

Build and test it locally with `-p:UmbracoMajor=20`, and use `#if UMBRACO_20_OR_GREATER` where its API differs. Drop
a major the same way when it is no longer supported; its published packages stay on NuGet.

## How publishing is authorised

Publishing uses [NuGet Trusted Publishing](https://learn.microsoft.com/nuget/nuget-org/trusted-publishing), so no
API key is stored anywhere. The workflow exchanges GitHub's OIDC token for a NuGet API key that lasts one hour.
nuget.org only accepts that token from this repository, this workflow file and the `production` environment. The
environment only lets `v*` tags deploy and waits for a maintainer's approval, so a branch, a pull request or a fork
can't publish.

## One-off setup

Make the repository public before the first release, unless the Umbricians organization is on GitHub Team or
higher. On GitHub Free a private repository has no rulesets and silently ignores the environment rules below, so
nothing would stop a branch from publishing. The package page also needs it public: the NuGet README's images and
links point at this repository, and the Umbraco Marketplace reads `umbraco-marketplace.json` from it, and the
Automate package's listing from `umbraco-marketplace-umbricians.mediacurator.automate.json`. Check the GitHub settings
below again after making it public.

**On nuget.org**, signed in as a member of the `umbricians` organization, create a trusted publishing policy with
owner `umbricians` (the owner of both packages), repository owner `Umbricians`, repository `Media-Curator`, workflow `build.yml` and environment
`production`. Owner and repository are matched without regard to case.

**In the GitHub repository**, every item is required:

1. **Branches:** push `main` and `develop`, then make `develop` the default branch (**Settings → General**).
2. **Settings → Environments:** create an environment named `production`, and in it:
   - add **required reviewers** (the maintainers) and leave **Prevent self-review** off, so a maintainer working
     alone can approve their own release. Turn off **Allow administrators to bypass configured protection rules**,
     so every publish still waits for an approval in the run;
   - under **Deployment branches and tags**, choose **Selected branches and tags** and add one rule of type **Tag**
     for `v*`, with no branch rules;
   - add a secret `NUGET_USER` holding the nuget.org **username** (profile name, not email) of the account that
     **created** the trusted publishing policy. For a policy owned by an organization, that is still the creator's
     own username.
3. **Settings → Rules → Rulesets:**
   - a branch ruleset for `main` and `develop` that requires a pull request and the `build` status check, and
     blocks force pushes and deletion. Allow merge commits on `main`, since release and hotfix branches merge back.
   - a tag ruleset for `v*` that restricts creation, update and deletion to maintainers.
4. **Labels:** create a `release-flow` label for release, hotfix and back-merge pull requests, which
   `.github/release.yml` leaves out of the release notes.
