import { test as base , chromium} from '@playwright/test';
//import { login } from '../setup/login';


/*test.beforeEach(async ({ page }) => {
  await login(page);     // login first using login.ts
});*/

// Persistent login
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


test('download module', async ({ page }) => {

    await page.goto('https://study-test.byupathway.edu/');
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('button', { name: 'Add Materials' }).click();
    //await page.getByText('Test', { exact: true }).click();
    //await page.getByRole('article').filter({ hasText: 'LLTEST - A Sample of' }).getByLabel('Download ePub').click();
    //await page.getByText('Part 1: Basic Formatting').click();
    await page.getByRole('button', { name: 'My Courses' }).click();
    await page.getByRole('article').filter({ hasText: 'BUS116 - Starting a' }).getByLabel('Download ePub').click();
    await page.locator('h1').click();
    //await page.pause();
});

test('bookmark', async ({ page }) => {

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

test('evaluation', async ({ page }) => {

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

test('search', async ({ page }) => {

    await page.goto('https://study-test.byupathway.edu/');
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('link', { name: 'BUS116 - Starting a business' }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('submit');
    await page.getByRole('textbox', { name: 'Search...' }).press('Enter');
    await page.getByText('Start Here BUS116 - Starting a business assignment in the Submit section at the').click();
    //await page.pause();
    });

test('submit', async ({ page }) => {

    await page.goto('https://study-test.byupathway.edu/');
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('link', { name: 'BUS116 - Starting a business' }).click();
    await page.getByText('W01 Submit').click();
    await page.getByRole('button', { name: 'I am committed to start my' }).click();
    await page.locator('[id="00802LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('[id="00803LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('[id="00804LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('[id="00805LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('[id="00806LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('[id="00807LA"]').getByRole('textbox', { name: 'Type your response...' }).fill('This is a test.');
    await page.locator('#taId-00808LA').fill('This is a test. ');
    await page.locator('#taId-00809LA').fill('This is a test. ');
    await page.locator('#taId-00810LA').fill('This is a test. ');
    await page.locator('#taId-00811LA').fill('This is a test. ');
    await page.locator('#taId-00812LA').fill('This is a test. ');
    await page.locator('#taId-00813LA').fill('This is a test. ');
    await page.locator('#taId-00814LA').fill('This is a test. ');
    await page.locator('#taId-00815LA').fill('This is a test. ');
    await page.locator('#taId-00816LA').fill('This is a test. ');
    await page.locator('#taId-00817LA').fill('This is a test. ');
    await page.locator('#taId-00818LA').fill('This is a test. ');
    await page.locator('#taId-00819LA').fill('This is a test. ');
    await page.getByRole('button', { name: 'Yes' }).click();
    
    const yesBtn = page.getByRole('button', { name: /^Yes$/i });
    await yesBtn.waitFor({ state: 'visible' });

    await Promise.all([
    yesBtn.click(),
    ]);

    const submitLink = page.getByRole('link', { name: /Submit Assignment$/i });
    await submitLink.waitFor({ state: 'visible' });
    await Promise.all([
    submitLink.click(),
    ]);

    await page.getByRole('button', { name: 'OK', exact: true }).click();
    //await page.pause();
});