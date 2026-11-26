// Checks a packed .nupkg before it can be published, and fails naming each problem:
//
//   node build/check-package.mjs <.nupkg> <version> <Umbraco version> <bundle URL path>
//
// - the .nuspec's version is the version the build packed;
// - every Umbraco CMS dependency's (Umbraco.Cms.*) range is [<Umbraco version>, <next major>.0.0-a), so the package
//   installs on its own Umbraco major only, and there is at least one. Other Umbraco packages, such as Umbraco Forms
//   or Umbraco.Community.*, have version lines of their own;
// - a stable package has no other dependency on a pre-release (its lower bound has a label). The project silences
//   NuGet's own warning for that (NU5104), which the CMS range's upper bound always trips;
// - the package carries its README, its icon and the backoffice bundle (static web assets under staticwebassets/).
//
// A published version can't be withdrawn, so a wrong range or a missing file must fail the build, not the site that
// installs it. The functions are exported for build/check-package.test.mjs.
import { readFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";
import { pathToFileURL } from "node:url";

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const [, , packagePath, version, umbracoVersion, bundlePath] = process.argv;
  if (!packagePath || !version || !umbracoVersion || !bundlePath) {
    console.error("Usage: node build/check-package.mjs <.nupkg> <version> <Umbraco version> <bundle URL path>");
    process.exit(1);
  }
  const problems = checkPackage(readZip(readFileSync(packagePath)), { version, umbracoVersion, bundlePath });
  if (problems.length) {
    console.error(`${packagePath} isn't fit to publish:\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`${packagePath}: version ${version}, Umbraco ${umbracoRange(umbracoVersion)}, README, icon and bundle present.`);
}

/** The Umbraco range a package for umbracoVersion's major must depend on. */
export function umbracoRange(umbracoVersion) {
  const major = Number(umbracoVersion.split(".")[0]);
  return `[${umbracoVersion}, ${major + 1}.0.0-a)`;
}

/** The problems with a package, given its files as a Map of path to contents. */
export function checkPackage(files, { version, umbracoVersion, bundlePath }) {
  const problems = [];
  const nuspecs = [...files.keys()].filter((path) => !path.includes("/") && path.endsWith(".nuspec"));
  if (nuspecs.length !== 1) return [`expected one .nuspec at the root, found ${nuspecs.length}`];
  const nuspec = files.get(nuspecs[0]).toString("utf8");

  const packed = nuspec.match(/<version>([^<]*)<\/version>/)?.[1];
  if (packed !== version) problems.push(`its version is ${packed}, not ${version}`);

  const range = umbracoRange(umbracoVersion);
  const dependencies = [...nuspec.matchAll(/<dependency\b[^>]*>/g)].map(([tag]) => ({ id: attribute(tag, "id"), version: attribute(tag, "version") }));
  const isUmbraco = (dependency) => dependency.id?.startsWith("Umbraco.Cms.");
  const umbraco = dependencies.filter(isUmbraco);
  if (umbraco.length === 0) problems.push("it has no Umbraco dependency");
  for (const dependency of umbraco) {
    if (dependency.version !== range) problems.push(`${dependency.id} is ${dependency.version}, not ${range}`);
  }
  if (!version.includes("-")) {
    for (const dependency of dependencies.filter((dependency) => !isUmbraco(dependency))) {
      if (lowerBound(dependency.version).includes("-")) {
        problems.push(`${dependency.id} is ${dependency.version}, a pre-release, which a stable package can't depend on`);
      }
    }
  }

  for (const [path, what] of [
    ["README.md", "README"],
    ["icon.png", "icon"],
    [`staticwebassets${bundlePath}`, "backoffice bundle"],
  ]) {
    if (!files.has(path)) problems.push(`the ${what} (${path}) is missing`);
  }
  return problems;
}

/** The lowest version a NuGet version range allows: "1.0.0", "[1.0.0, 2.0.0)" and "(1.0.0,)" give 1.0.0, "(, 2.0.0]" "". */
function lowerBound(range = "") {
  return range.replace(/^[[(]/, "").split(",")[0].trim();
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

/**
 * The files in a zip (a .nupkg is one), as a Map of path to contents. Reads the central directory, so it handles
 * what NuGet writes: stored or deflated entries, without zip64 or encryption.
 */
export function readZip(zip) {
  const end = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (end < 0) throw new Error("not a zip file: no end of central directory");
  const count = zip.readUInt16LE(end + 10);
  let at = zip.readUInt32LE(end + 16);
  const files = new Map();
  for (let i = 0; i < count; i++) {
    if (zip.readUInt32LE(at) !== 0x02014b50) throw new Error("not a zip file: bad central directory entry");
    const method = zip.readUInt16LE(at + 10);
    const compressedSize = zip.readUInt32LE(at + 20);
    const nameLength = zip.readUInt16LE(at + 28);
    const extraLength = zip.readUInt16LE(at + 30);
    const commentLength = zip.readUInt16LE(at + 32);
    const localHeader = zip.readUInt32LE(at + 42);
    const name = decodeURIComponent(zip.toString("utf8", at + 46, at + 46 + nameLength));
    at += 46 + nameLength + extraLength + commentLength;

    const dataStart = localHeader + 30 + zip.readUInt16LE(localHeader + 26) + zip.readUInt16LE(localHeader + 28);
    const data = zip.subarray(dataStart, dataStart + compressedSize);
    if (method === 0) files.set(name, data);
    else if (method === 8) files.set(name, inflateRawSync(data));
    else throw new Error(`${name} uses zip compression method ${method}, which this check can't read`);
  }
  return files;
}
