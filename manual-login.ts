import { chromium } from '@playwright/test';
import 'dotenv/config';

// This script is used to perform a manual login and save the authentication state to a file.
(async () => {
  const context = await chromium.launchPersistentContext('./my-profile', {
    headless: false
  });

  const page = context.pages()[0] || await context.newPage();
  const website  = process.env.WEBSITE;
  // Go to the website and log in
  await page.goto(website!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signin-container').click();
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;
  await page.getByRole('textbox', { name: 'Username' }).fill(username!);
  await page.getByText('Keep me signed in').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password!);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await context.close();
})();
