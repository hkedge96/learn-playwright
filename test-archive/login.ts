import { chromium, test } from "@playwright/test"

test("Login test demo", async() => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.byupathway.edu/");
    await page.getByRole('button', { name: ' Sign In' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Sign In to New Portal' }).click();
    const page1 = await page1Promise;

}) 