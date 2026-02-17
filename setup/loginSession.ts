import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch({ headless: false } );
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to your login page
  await page.goto('https://study-test.byupathway.edu/');

  // Perform login steps here
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#signin-container').click();
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.EMAIL!);
  await page.getByText('Keep me signed in').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Wait until navigation finishes (optional)
  //await page.waitForLoadState('networkidle');
  await page.waitForURL('**study-test.byupathway.edu**');
  //await page.getByRole('button', { name: 'Add Materials' }).waitFor({ timeout: 15000 });


  // Save session to a file
  await context.storageState({ path: 'auth.json' });

  await browser.close();
}

export default globalSetup;