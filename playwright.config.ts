import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'Desktop Chrome',
      testDir: './tests',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Pixel 5',
      testDir: './mobile_tests',
      timeout: 60000, // 60 seconds for each test
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
};

export default defineConfig(config);