import { test as base , chromium} from '@playwright/test';
import { login } from '../setup/login';


/*test.beforeEach(async ({ page }) => {
  await login(page);     // login first using login.ts
});*/

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
    //await page.getByRole('img', { name: 'Dev Test1' }).click();
   // await page.getByRole('link', { name: 'Dev Test1' }).click();
    await page.locator('a.bookCard').nth(0).click();
    //await page.locator('img.cardImage svelte-11xxdgh').click();
    await page.getByRole('button', { name: 'Add Materials' }).click();
    //await page.getByText('Test', { exact: true }).click();
    //await page.getByRole('article').filter({ hasText: 'LLTEST - A Sample of' }).getByLabel('Download ePub').click();
    //await page.getByText('Part 1: Basic Formatting').click();
    await page.getByRole('button', { name: 'My Courses' }).click();
    await page.getByRole('article').filter({ hasText: 'BUS116 - Starting a' }).getByLabel('Download ePub').click();
    await page.locator('h1').click();
    await page.pause();
});

