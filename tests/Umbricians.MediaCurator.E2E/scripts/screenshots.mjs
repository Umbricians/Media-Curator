// Retakes the screenshots in docs/images from a fresh demo site.
//
//   npm run screenshots              (from tests/Umbricians.MediaCurator.E2E)
//   npm run screenshots -- --no-build --major 18 --port 40270
//   npm run screenshots -- --keep     (leaves the demo running afterwards, to look around it)
//
// Needs OPENAI_API_KEY, from the environment or tests/Umbricians.MediaCurator.E2E/.env (git ignores it). The key only
// reaches the demo, as the configuration value Umbraco:AI:Secrets:OpenAIApiKey that the script's Umbraco.AI connection
// refers to, so it never goes through the API or into Playwright's output. A run analyses about 55 photos with AI (a
// few cents).
//
// It downloads the demo photos listed in screenshots/photos.json (scripts/download-photos.mjs), builds the demo for one
// Umbraco major (18 by default, the version the screenshots show), installs it on new SQLite databases in a temporary
// folder, runs playwright.screenshots.config.ts against it, and stops it again.
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import dotenv from 'dotenv';

const e2eDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = resolve(e2eDir, '../..');
const demoDir = join(repoDir, 'demo/Umbricians.MediaCurator.Demo');

const { values: options } = parseArgs({
  options: {
    major: { type: 'string', default: '18' },
    port: { type: 'string', default: '40264' },
    'no-build': { type: 'boolean', default: false },
    keep: { type: 'boolean', default: false },
  },
});

const secrets = dotenv.config({ path: join(e2eDir, '.env'), processEnv: {} }).parsed ?? {};
const apiKey = process.env.OPENAI_API_KEY || secrets.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY is missing: set it in the environment or in tests/Umbricians.MediaCurator.E2E/.env.');
  process.exit(1);
}

const url = `http://localhost:${options.port}`;
const user = { login: 'admin@example.test', password: 'MediaCuratorDemo!2026' }; // the demo's unattended install user

run('node', [join(e2eDir, 'scripts/download-photos.mjs')]);
if (!options['no-build']) {
  run('dotnet', ['build', demoDir, '-c', 'Release', `-p:UmbracoMajor=${options.major}`, '--nologo', '-v', 'q']);
}

const databaseDir = mkdtempSync(join(tmpdir(), 'media-curator-screenshots-'));
const sqlite = (file) => `Data Source=${join(databaseDir, file)};Foreign Keys=True;Pooling=True`;
const demo = spawn(
  'dotnet',
  ['run', '-c', 'Release', '--no-build', '--no-launch-profile', `-p:UmbracoMajor=${options.major}`, '--urls', url],
  {
    cwd: demoDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      ASPNETCORE_ENVIRONMENT: 'Development',
      DOTNET_ENVIRONMENT: 'Development',
      ConnectionStrings__umbracoDbDSN: sqlite('Umbraco.sqlite.db'),
      ConnectionStrings__umbracoDbDSN_ProviderName: 'Microsoft.Data.Sqlite',
      ConnectionStrings__umbracoAutomateDbDSN: sqlite('UmbracoAutomate.sqlite.db'),
      ConnectionStrings__umbracoAutomateDbDSN_ProviderName: 'Microsoft.Data.Sqlite',
      // The screenshots start from an empty media library, not the demo's sample folder.
      MediaCuratorDemo__SeedSampleContent: 'false',
      Umbraco__AI__Secrets__OpenAIApiKey: apiKey,
    },
  },
);
let demoLog = '';
demo.stdout.on('data', (chunk) => (demoLog += chunk));
demo.stderr.on('data', (chunk) => (demoLog += chunk));

let exitCode = 1;
try {
  await waitForDemo();
  const result = spawnSync('npx', ['playwright', 'test', '--config=playwright.screenshots.config.ts'], {
    cwd: e2eDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      OPENAI_API_KEY: '', // the tests don't need it
      PW_CDP_ENDPOINT: '',
      URL: url,
      UMBRACO_URL: url,
      UMBRACO_USER_LOGIN: user.login,
      UMBRACO_USER_PASSWORD: user.password,
    },
  });
  exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  console.error(demoLog.split('\n').slice(-40).join('\n'));
} finally {
  if (options.keep && demo.exitCode === null) {
    console.log(`The demo is still running on ${url} (sign in as ${user.login}); press Ctrl+C to stop it.`);
    await new Promise((done) => {
      process.once('SIGINT', done);
      process.once('SIGTERM', done);
    });
  }
  demo.kill();
  await new Promise((done) => (demo.exitCode !== null ? done() : demo.once('exit', done)));
  rmSync(databaseDir, { recursive: true, force: true });
}
process.exit(exitCode);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

/** Waits until Umbraco has finished installing: /umbraco answers while the install is still running. */
async function waitForDemo() {
  let status = 'not listening';
  for (let attempt = 0; attempt < 150; attempt++) {
    if (demo.exitCode !== null) throw new Error(`The demo stopped (exit code ${demo.exitCode}).`);
    try {
      const response = await fetch(`${url}/umbraco/management/api/v1/server/status`);
      status = response.ok ? (await response.json()).serverStatus : `HTTP ${response.status}`;
      if (status === 'Run') return;
    } catch {
      // Not listening yet.
    }
    await new Promise((done) => setTimeout(done, 2000));
  }
  throw new Error(`The demo on ${url} wasn't ready within 5 minutes (server status: ${status}).`);
}
