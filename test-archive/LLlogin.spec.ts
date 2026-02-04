import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://study-test.byupathway.edu/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signin-container').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('devtest1@churchofjesuschrist.org');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('byupathway');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
});