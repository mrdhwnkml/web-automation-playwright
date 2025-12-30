import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
const username = process.env.USERNAMES;
const password = process.env.PASSWORD;


test('User login with valid data should be success', async ({ page, context }) => {

    await page.goto(baseURL);

    await page.locator('//input[@name="username"]').fill(username);
    await page.locator('//input[@name="password"]').fill(password);
    await page.locator('//button[@type="submit"]').click()

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    await page.locator('//span[@class="oxd-userdropdown-tab"]').click()
    await page.locator('(//a[@role="menuitem"])[4]').click()

    await expect(page).toHaveURL(baseURL)

});

test('User login with invalid data should be error', async ({ page, context }) => {

    await page.goto(baseURL);

    await page.locator('//input[@name="username"]').fill(username);
    await page.locator('//input[@name="password"]').fill('xxx');
    await page.locator('//button[@type="submit"]').click()
    await expect(page.getByText('Invalid credentials')).toBeVisible()
});

test('User login without filled any field should be error', async ({ page, context }) => {

    await page.goto(baseURL);
    await page.locator('//button[@type="submit"]').click()
    await expect(page.getByText('Required')).toHaveCount(2)
});

test('User login without filled username field should be error', async ({ page, context }) => {

    await page.goto(baseURL);
    await page.locator('//input[@name="password"]').fill(password);
    await page.locator('//button[@type="submit"]').click()
    await expect(page.getByText('Required')).toBeVisible()
});

test('User login without filled password field should be error', async ({ page, context }) => {

    await page.goto(baseURL);
    await page.locator('//input[@name="username"]').fill(username);
    await page.locator('//button[@type="submit"]').click()
    await expect(page.getByText('Required')).toBeVisible()
});