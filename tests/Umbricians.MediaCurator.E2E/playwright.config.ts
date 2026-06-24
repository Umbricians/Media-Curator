import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const STORAGE_STATE = join(__dirname, 'tests/e2e/.auth/user.json');

// CRITICAL: Testhelpers read auth tokens from this file
process.env.STORAGE_STAGE_PATH = STORAGE_STATE;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? 'line' : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    // CRITICAL: Umbraco uses 'data-mark' not 'data-testid'
    testIdAttribute: 'data-mark',
  },
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      use: {
        // Use the system-installed Chrome: the sandbox cannot download Playwright browsers
        channel: 'chrome',
      },
    },
    {
      name: 'e2e',
      testMatch: '**/*.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        ignoreHTTPSErrors: true,
        storageState: STORAGE_STATE,
      },
    },
  ],
});
