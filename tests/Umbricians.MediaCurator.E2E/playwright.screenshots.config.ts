import { defineConfig, devices } from '@playwright/test';
import { STORAGE_STATE } from './playwright.config';

// Takes the README, docs and Marketplace screenshots. Run it through `npm run screenshots`, which starts a fresh demo
// site with an AI connection first; see scripts/screenshots.mjs.
export default defineConfig({
  timeout: 30 * 60 * 1000,
  expect: { timeout: 30000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  // Nothing that records requests: the run sets up the AI connection through the API.
  use: {
    baseURL: process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264',
    trace: 'off',
    video: 'off',
    screenshot: 'off',
    testIdAttribute: 'data-mark',
  },
  projects: [
    {
      name: 'setup',
      testDir: './tests/e2e',
      testMatch: 'auth.setup.ts',
      use: { channel: 'chrome' },
    },
    {
      name: 'screenshots',
      testDir: './screenshots',
      testMatch: '*.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: STORAGE_STATE,
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: 'light',
        reducedMotion: 'reduce',
      },
    },
  ],
});
