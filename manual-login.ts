import { chromium } from '@playwright/test';

(async () => {
  const context = await chromium.launchPersistentContext('./my-profile', {
    headless: false
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://study-test.byupathway.edu/');
})();
