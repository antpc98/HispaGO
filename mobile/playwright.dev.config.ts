import { defineConfig } from '@playwright/test';

import config from './playwright.config';

export default defineConfig({
  ...config,
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: { ...config.use, baseURL: 'http://127.0.0.1:8084' },
  webServer: {
    command: 'npx expo start --offline --clear --port 8084',
    url: 'http://127.0.0.1:8084/status',
    env: { CI: '1', EXPO_NO_TELEMETRY: '1' },
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
