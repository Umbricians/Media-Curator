// Starts the built demo site, checks it serves the backoffice, the package's bundle and the package's API document,
// which only exists once the package's composer has run, then stops it. The document must have the given title, and
// its operations must send the backoffice user's token, so "Try it out" in the backoffice's API docs works. Any further
// bundle URL paths, such as an extension package's, must be served too.
//
//   node build/smoke-test.mjs <demo project folder> <bundle URL path> <API name> <Umbraco major> <API document title>
//                             [<other bundle URL path>...]
//
// The API document is /umbraco/swagger/{API name}/swagger.json on Umbraco 17 and /umbraco/openapi/{API name}.json from
// 18. Run it after `dotnet build -c Release -p:UmbracoMajor=…` for the same major. In Development the demo
// installs itself, here on fresh SQLite databases of its own.
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const SITE_URL = "http://127.0.0.1:5080";
const STARTUP_TIMEOUT_MS = 180_000;
const POLL_INTERVAL_MS = 2_000;

// The security scheme Umbraco's backoffice API docs use for the backoffice user's token.
const BACKOFFICE_SCHEME = "Backoffice-User";

const [, , demoFolder, bundlePath, apiName, umbracoMajor, documentTitle, ...otherBundlePaths] = process.argv;
if (!demoFolder || !bundlePath || !apiName || !/^[0-9]+$/.test(umbracoMajor ?? "") || !documentTitle) {
  console.error(
    "Usage: node smoke-test.mjs <demo project folder> <bundle URL path> <API name> <Umbraco major> <API document title> [<other bundle URL path>...]",
  );
  process.exit(1);
}

const documentPath = Number(umbracoMajor) >= 18 ? `/umbraco/openapi/${apiName}.json` : `/umbraco/swagger/${apiName}/swagger.json`;
const projectDir = resolve(demoFolder);
// Where MSBuild put the demo for this major (Directory.Build.props gives each major its own bin folder).
const assembly = execFileSync(
  "dotnet",
  ["msbuild", projectDir, "-getProperty:TargetPath", "-p:Configuration=Release", `-p:UmbracoMajor=${umbracoMajor}`],
  { encoding: "utf8" },
).trim();
console.log(`Starting ${assembly}`);
// Each run installs on new databases of its own: the demo's own ones belong to whichever major ran it last, and
// Umbraco won't start on a newer major's database. Every SQLite database the demo's Development settings name, such as
// one another product keeps apart from Umbraco's, moves to a new folder.
const databaseDir = mkdtempSync(join(tmpdir(), "umbricians-smoke-"));
const site = spawn("dotnet", [assembly, "--urls", SITE_URL], {
  cwd: projectDir,
  env: {
    ...process.env,
    ASPNETCORE_ENVIRONMENT: "Development",
    DOTNET_ENVIRONMENT: "Development",
    ...sqliteConnectionStrings(join(projectDir, "appsettings.Development.json"), databaseDir),
  },
  stdio: "inherit",
});

try {
  await waitUntilOk(`${SITE_URL}/umbraco`);
  for (const path of [bundlePath, ...otherBundlePaths]) await expectOk(`${SITE_URL}${path}`);
  checkDocument(await fetchJson(`${SITE_URL}${documentPath}`));
  const bundles = otherBundlePaths.length > 0 ? "bundles" : "bundle";
  console.log(`The Umbraco ${umbracoMajor} demo serves the backoffice, the package's ${bundles} and its API document, which sends the backoffice token.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  site.kill();
  await new Promise((done) => (site.exitCode === null ? site.once("exit", done) : done()));
  rmSync(databaseDir, { recursive: true, force: true });
}

// The settings file's SQLite connection strings, as environment variables that put their databases in databaseDir.
function sqliteConnectionStrings(settingsFile, databaseDir) {
  const { ConnectionStrings: connectionStrings = {} } = JSON.parse(readFileSync(settingsFile, "utf8"));
  const variables = {};
  for (const [name, value] of Object.entries(connectionStrings)) {
    if (connectionStrings[`${name}_ProviderName`] !== "Microsoft.Data.Sqlite") continue;
    variables[`ConnectionStrings__${name}`] = value.replace("|DataDirectory|", databaseDir);
  }
  if (!variables.ConnectionStrings__umbracoDbDSN) throw new Error(`${settingsFile} has no SQLite umbracoDbDSN connection string.`);
  return variables;
}

async function waitUntilOk(url) {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (site.exitCode !== null) throw new Error(`The demo exited with code ${site.exitCode} before ${url} answered.`);
    if (await isOk(url)) return;
    await new Promise((done) => setTimeout(done, POLL_INTERVAL_MS));
  }
  throw new Error(`${url} didn't answer within ${STARTUP_TIMEOUT_MS / 1000} seconds.`);
}

async function expectOk(url) {
  if (!(await isOk(url))) throw new Error(`${url} didn't return a success status.`);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}.`);
  return response.json();
}

// A new package has no operations yet, so only the operations there are must send the token.
function checkDocument(document) {
  const problems = [];
  if (document.info?.title !== documentTitle) {
    problems.push(`its title is '${document.info?.title}', not '${documentTitle}'`);
  }
  if (!document.components?.securitySchemes?.[BACKOFFICE_SCHEME]) {
    problems.push(`it has no ${BACKOFFICE_SCHEME} security scheme`);
  }
  const operations = Object.values(document.paths ?? {}).flatMap((path) =>
    Object.entries(path)
      .filter(([method]) => ["get", "put", "post", "delete", "patch"].includes(method))
      .map(([, operation]) => operation),
  );
  const sendsToken = (operation) =>
    (operation.security ?? document.security ?? []).some((requirement) => BACKOFFICE_SCHEME in requirement);
  const withoutToken = operations.filter((operation) => !sendsToken(operation)).map((operation) => operation.operationId);
  if (withoutToken.length > 0) {
    problems.push(`these operations don't send the ${BACKOFFICE_SCHEME} token: ${withoutToken.join(", ")}`);
  }
  if (problems.length > 0) throw new Error(`The API document is wrong: ${problems.join("; ")}.`);
}

async function isOk(url) {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false; // The site isn't listening yet.
  }
}
