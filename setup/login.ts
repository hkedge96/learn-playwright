
import { expect, Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('https://study-test.byupathway.edu/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signin-container').click();
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.EMAIL!);
  await page.getByText('Keep me signed in').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByRole('heading', { name: 'Download Study Materials' })).toBeVisible();
  


}

