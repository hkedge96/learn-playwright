import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  
  /*globalSetup: require.resolve('./setup/loginSession.ts'),

  // 2) Reuse the saved auth state in all tests
  use: {
    
    storageState: 'auth.json',
    headless: false
    baseURL: 'https://study-test.byupathway.edu/' // optional but nice
    
  },
    
  workers: 1,              //  only one worker to avoid multiple browsers
  retries: 0, */

  projects: [
    {
      name: 'Desktop Chrome',
      timeout: 600000, // 60 seconds for each test
      testDir: './tests',
      use: {
        browserName: 'chromium',
      },
    },
    
    /*{
      name: 'Pixel 5',
      testDir: './mobile_tests',
      timeout: 60000, // 60 seconds for each test
      use: {
        ...devices['Galaxy A10'],
      },
    },*/

  ],
  reporter: [
  ['list'],
  ['junit', { outputFile: 'results.xml' }]
]
};

export default defineConfig(config);