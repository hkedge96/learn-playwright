import fs from 'fs';
import { execSync } from 'child_process';
import { test as base, chromium } from '@playwright/test';

// ✅ CHECK IF ./my-profile EXISTS (in project root)
if (!fs.existsSync('./my-profile')) {
  console.log('my-profile not found. Running manual-login.ts...');
  execSync('node ./manual-login.ts', { stdio: 'inherit' });
} else {
  console.log('my-profile exists. Continuing with tests...');
}

// ✅ EXTEND TEST WITH PERSISTENT CONTEXT
const test = base.extend({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('./my-profile', {
      headless: true,
    });
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = context.pages()[0] ?? await context.newPage();
    await use(page);
  }
});


const website  = process.env.WEBSITE;


test('Download modules', {tag: ['@regression', '@smoke']}, async ({ page }) => {

  // Go to the website and log in
  await page.goto(website!);
  await page.locator('a.bookCard').nth(0).click();

  // Download the module
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Materials' }).click();
  await page.getByRole('button', { name: 'My Courses' }).click();
  await page.getByRole('article').filter({ hasText: 'BUS116 - Starting a' }).getByLabel('Download ePub').click();

  // Check if the download was successful
  await page.locator('h1').click();

  await page.getByRole('treeitem', { name: 'W01 Read' }).click();

  // Make a bookmark
  await page.getByRole('button', { name: 'Add Bookmark' }).click();
  await page.getByRole('article').filter({ hasText: 'BUS116 - Starting a business' }).getByLabel('More Options').click();
  await page.getByRole('link', { name: ' Rename' }).click();
  await page.getByRole('textbox', { name: 'New Name:' }).click();
  await page.getByRole('textbox', { name: 'New Name:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'New Name:' }).fill('');
  await page.getByRole('textbox', { name: 'New Name:' }).click();
  await page.getByRole('textbox', { name: 'New Name:' }).fill('Study Today');
  await page.getByRole('button', { name: 'OK', exact: true }).click();

  await page.locator('button').filter({ hasText: 'Menu' }).click();
  await page.getByRole('treeitem', { name: 'W03 Evaluation' }).click();

  // Click the evaluation link and check if it redirects to the correct page
  const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('link', { name: 'Complete Evaluation' }).click(),
]);

// no actions in popup
  await popup.close(); // or just leave it open if truly irrelevant


  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search...' }).fill('submit');
  await page.getByRole('textbox', { name: 'Search...' }).press('Enter');

  // Check if the search results are correct
  await page.getByText('Start Here BUS116 - Starting a business assignment in the Submit section at the').click();

  await page.locator('button').filter({ hasText: 'Menu' }).click();
  await page.getByRole('treeitem', { name: 'W01 Submit' }).click();

  // Fill out the assignment and submit it
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

  // Wait for the "Yes" button to be visible before clicking
  const yesBtn = page.getByRole('button', { name: /^Yes$/i });
  await yesBtn.waitFor({ state: 'visible' });

  // Click the "Yes" button
  await Promise.all([
    yesBtn.click(),
  ]);

  // Wait for the "Submit Assignment" link to be visible before clicking
  const submitLink = page.getByRole('link', { name: /Submit Assignment$/i });
  await submitLink.waitFor({ state: 'visible' });

  // Click the "Submit Assignment" link
  await Promise.all([
    submitLink.click(),
  ]);

  // Click the "OK" button
  await page.getByRole('button', { name: 'OK', exact: true }).click();

});