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
    


