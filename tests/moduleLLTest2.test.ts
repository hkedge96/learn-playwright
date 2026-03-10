/* LLTest - Part 2: Simple Sample Features */

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

test('Part 2: Simple Sample Features', {tag: ['@regression', '@smoke']}, async ({ page }) => {

    await page.goto(website!);
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('link', { name: 'LLTEST - A Sample of Features' }).click();
    await page.getByRole('treeitem', { name: 'Part 2: Simple Special Features' }).click();
    await page.getByRole('heading', { name: 'Part 2: Simple Special Features' }).isVisible();

     });

test('Accordion Box', {tag: ['@regression', '@smoke']}, async ({ page }) => {

    await page.goto(website!);
    await page.locator('a.bookCard').nth(0).click();
    await page.getByRole('link', { name: 'LLTEST - A Sample of Features' }).click();
    await page.getByRole('treeitem', { name: 'Accordion Box' }).click();
    await page.getByRole('heading', { name: 'Accordion Box' }).isVisible();

    //First Accordion Box
    const firstSectionButton1 = page.locator('#pg-itm-1').getByRole('button', { name: /First Section/ });
    await firstSectionButton1.click();
    await expect(firstSectionButton1).toHaveClass(/active/);

    const secondSectionButton1 = page.locator('#pg-itm-1').getByRole('button', { name: /Second Section/ });
    await secondSectionButton1.click();
    await expect(secondSectionButton1).toHaveClass(/active/);

    const thirdSectionButton1 = page.locator('#pg-itm-1').getByRole('button', { name: /Third Section/ });
    await thirdSectionButton1.click();
    await expect(thirdSectionButton1).toHaveClass(/active/);

    // Second Accordion Box
    const firstSectionButton2 = page.locator('#pg-itm-2').getByRole('button', { name: /First Section/ });
    await firstSectionButton2.click();
    await expect(firstSectionButton2).toHaveClass(/active/);

    const secondSectionButton2 = page.locator('#pg-itm-2').getByRole('button', { name: /Second Section/ });
    await secondSectionButton2.click();
    await expect(secondSectionButton2).toHaveClass(/active/);

    const thirdSectionButton2 = page.locator('#pg-itm-2').getByRole('button', { name: /Third Section/ });
    await thirdSectionButton2.click();
    await expect(thirdSectionButton2).toHaveClass(/active/);

    // Third Accordion Box
    const firstSectionButton3 = page.locator('#pg-itm-3').getByRole('button', { name: /First Section/ });
    await firstSectionButton3.click();
    await expect(firstSectionButton3).toHaveClass(/active/);

    const secondSectionButton3 = page.locator('#pg-itm-3').getByRole('button', { name: /Second Section/ });
    await secondSectionButton3.click();
    await expect(secondSectionButton3).toHaveClass(/active/);

    const thirdSectionButton3 = page.locator('#pg-itm-3').getByRole('button', { name: /Third Section/ });
    await thirdSectionButton3.click();
    await expect(thirdSectionButton3).toHaveClass(/active/);

});