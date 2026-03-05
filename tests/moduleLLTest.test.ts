import fs from 'fs';
import { execSync } from 'child_process';
import { test as base, chromium, expect } from '@playwright/test';

// EXTEND TEST WITH PERSISTENT CONTEXT
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

test.beforeAll(() => {
  if (!fs.existsSync('./my-profile')) {
    console.log('my-profile not found. Running manual-login.ts...');
    execSync('node ./manual-login.ts', { stdio: 'inherit' });
  } else {
    console.log('my-profile exists. Continuing with tests...');
  }
});


test('Download modules', {tag: ['@regression', '@smoke']}, async ({ page }) => {

  /* Download the module and check if the download was successful */
  // Go to the website and log in
  await page.goto(website!);
  await page.locator('a.bookCard').nth(0).click();

  

  // Download the module
  //await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Add Materials' }).click();
  await page.getByRole('button', { name: 'My Courses' }).click();
  await page.getByRole('article').filter({ hasText: 'LLTEST - A Sample of' }).getByLabel('Download ePub').click();

  /* Test Course Page */
  await page.getByRole('heading', { name: 'Test Course' }).isVisible();

  // Check if images are available
  await page.locator('#pg-itm-3 img').isVisible();
  await page.locator('#pg-itm-4 img').isVisible();
  await page.getByText('This is just a short test').isVisible();




  /* Basic Formatting Page */
  await page.getByRole('treeitem', { name: 'Part 1: Basic Formatting' }).click();
  await page.getByRole('heading', { name: 'Part 1: Basic Formatting' }).isVisible();

  // Response History Button
  await page.getByRole('button', { name: 'Response History' }).click();
  await page.getByRole('button', { name: 'Responses' }).isVisible();
  await page.locator('#responsePage').selectOption('16'); // Long Answer Option
  await page.getByText('How would you make a long-').isVisible();
  await page.locator('#responsePage').selectOption('24'); // Course Assignment Option
  await page.getByText('How would you make a study').isVisible();
  await page.getByRole('button', { name: 'Close Notes Panel' }).click();

  /* Headings Page */
  await page.getByRole('treeitem', { name: 'Headings' }).click();
  await page.getByRole('heading', { name: 'Headings' }).isVisible();
  await page.getByText('(Heading 1 is used to').isVisible();
  await page.getByRole('heading', { name: 'Heading 2' }).isVisible();
  await page.locator('#pg-itm-5').isVisible();
  await page.getByRole('heading', { name: 'Heading 3' }).isVisible();
  await page.locator('#pg-itm-7').isVisible();
  await page.getByRole('heading', { name: 'Heading 4' }).isVisible();
  await page.locator('#pg-itm-9').isVisible();

  /* Images Page */
  await page.getByRole('treeitem', { name: 'Images' }).click();
  await page.getByRole('heading', { name: 'Images' }).isVisible();

  // Full Width Image
  await page.getByRole('heading', { name: 'Full Width Image' }).isVisible();
  await page.locator('#pg-itm-4 img').isVisible();
  const fullWidthImg = page.locator('#pg-itm-4 img');
  await expect( fullWidthImg).toBeVisible();
  const  fullWidthbox = await  fullWidthImg.boundingBox();
  expect(fullWidthbox?.width).toBeLessThanOrEqual(650);
  expect(fullWidthbox?.height).toBeLessThanOrEqual(400);

  // Scaled Image
  await page.getByRole('heading', { name: 'Scaled Image' }).isVisible();
  await page.locator('#pg-itm-6 img').isVisible();
  const scaledImg = page.locator('#pg-itm-6 img');
  await expect(scaledImg).toBeVisible();
  const scaledImgbox = await scaledImg.boundingBox();
  expect(scaledImgbox?.width).toBeLessThanOrEqual(320);
  expect(scaledImgbox?.height).toBeLessThanOrEqual(200) ;

  // Cropped Image
  await page.getByRole('heading', { name: 'Cropped Image' }).isVisible();
  await page.getByText('This image is cropped in the').isVisible();
  await page.locator('#pg-itm-9 img').isVisible();
  const croppedImg = page.locator('#pg-itm-9 img');
  await expect(croppedImg).toBeVisible();
  const croppedImgbox = await croppedImg.boundingBox();
  expect(croppedImgbox?.width).toBeLessThanOrEqual(250);
  expect(croppedImgbox?.height).toBeLessThanOrEqual(150);

  /* Lists Page */

  await page.getByRole('treeitem', { name: 'Lists' }).click();
  await page.getByRole('heading', { name: 'Lists' }).isVisible();
  await page.getByRole('heading', { name: 'Unordered List' , exact: true }).isVisible();
  const unorderedItems = page.locator('#pg-itm-4 li');
  expect(await unorderedItems.count()).toBeGreaterThanOrEqual(2);
  await page.getByRole('heading', {  name: 'Ordered List' , exact: true }).isVisible();
  const orderedItems = page.locator('#pg-itm-7 li');
  expect(await orderedItems.count()).toBeGreaterThanOrEqual(2);
  await page.getByRole('heading', { name: 'Multi-Level Ordered List' , exact: true  }).isVisible();
  // Level 1 (top level): Multi-Level Ordered List 
  const level1 = page.locator('#pg-itm-10 > li');
  await expect(level1.first()).toBeVisible();

  expect(await level1.count()).toBeGreaterThanOrEqual(2); 

  // Level 2 (nested): One
  const level2 = page.locator('#pg-itm-10 > ol > li');
  await expect(level2.first()).toBeVisible();

  expect(await level2.count()).toBeGreaterThanOrEqual(2);
});
