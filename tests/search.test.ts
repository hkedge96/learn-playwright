import { test as base , chromium} from '@playwright/test';
import { login } from '../setup/login';


const test = base.extend({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('./my-profile', {
      headless: false,    
    });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = context.pages()[0] || await context.newPage();
    await use(page);
  }
});

test('test', async ({ page }) => {

    await page.goto('https://study-test.byupathway.edu/');
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('link', { name: 'BUS116 - Starting a business' }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('submit');
    await page.getByRole('textbox', { name: 'Search...' }).press('Enter');
    await page.getByText('Start Here BUS116 - Starting a business assignment in the Submit section at the').click();
    await page.pause();
    });