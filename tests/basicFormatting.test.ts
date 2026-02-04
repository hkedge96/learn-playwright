import { test, expect } from '@playwright/test';
import { login } from '../setup/login';

test.beforeEach(async ({ page }) => {
  await login(page);     // login first
});

test('test', async ({ page }) => {
    await page.goto('https://study-test.byupathway.edu/');
    await page.getByRole('link', { name: 'Add Materials' }).click();
    await page.getByText('Test', { exact: true }).click();
    await page.getByRole('article').filter({ hasText: 'LLTEST - A Sample of' }).getByLabel('Download ePub').click();
    await page.getByText('Part 1: Basic Formatting').click();
});