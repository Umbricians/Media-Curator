import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const STORAGE_STATE = join(__dirname, 'tests/e2e/.auth/user.json');
process.env.STORAGE_STAGE_PATH = STORAGE_STATE;

const videoDir = process.env.DEMO_VIDEO_DIR || join(__dirname, 'demo-videos');

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120 * 1000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264',
    trace: 'off',
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-mark',
    video: {
      mode: 'on',
      size: { width: 1440, height: 900 },
    },
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      slowMo: 500,
    },
  },
  outputDir: videoDir,
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      use: { channel: 'chrome' },
    },
    {
      name: 'demo',
      testMatch: '**/demo-walkthrough.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: STORAGE_STATE,
      },
    },
  ],
});
