import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig} from '@playwright/test';
import 'dotenv/config';


export default defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: false,
  use: {
    headless: true,
  },
  reporter: [
    ['html', { open: 'always' }]
  ],
});
