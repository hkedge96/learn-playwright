import { test as base , chromium} from '@playwright/test';

//Persistent login
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
    await page.getByRole('treeitem', { name: 'W03 Evaluation' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: ' Complete Evaluation' }).click();
    const page1 = await page1Promise;
    await page1.locator('.QuestionText').first().click();
    //await page.pause();
    });