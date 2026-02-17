import { test } from '@playwright/test';
import { login } from '../setup/login';


test.beforeEach(async ({ page }) => {
  await login(page);     // login first using login.ts
});

test('test', async ({ page }) => {
    
  /*const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();*/

    await page.goto('https://study-test.byupathway.edu/');
    //await page.getByRole('button', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Add Materials' }).click();
    await page.getByText('Test', { exact: true }).click();
    await page.getByRole('article').filter({ hasText: 'LLTEST - A Sample of' }).getByLabel('Download ePub').click();
    await page.getByText('Part 1: Basic Formatting').click();
});

