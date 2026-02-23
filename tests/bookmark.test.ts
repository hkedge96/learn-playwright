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
    await page.getByRole('treeitem', { name: 'W01 Read' }).click();
    await page.getByRole('button', { name: 'Add Bookmark' }).click();
    await page.getByRole('article').filter({ hasText: 'BUS116 - Starting a business' }).getByLabel('More Options').click();
    await page.getByRole('link', { name: ' Rename' }).click();
    await page.getByRole('textbox', { name: 'New Name:' }).click();
    await page.getByRole('textbox', { name: 'New Name:' }).press('ControlOrMeta+a');
    await page.getByRole('textbox', { name: 'New Name:' }).fill('');
    await page.getByRole('textbox', { name: 'New Name:' }).click();
    await page.getByRole('textbox', { name: 'New Name:' }).fill('Study Today');
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    //await page.pause();
    });
