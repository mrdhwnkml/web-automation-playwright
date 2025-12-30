import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv';
import { readValueFromFile } from '../utils/helper';

dotenv.config();

const baseURL = process.env.BASE_URL;

// Membaca nilai dari file di folder local-storage
const username = readValueFromFile('username');
const password = readValueFromFile('password');

test('User login with fresh user should be success', async ({ page, context }) => {
    await page.waitForTimeout(10000); // Menunggu selama 2 detik

    await page.goto(baseURL).toBeVisible;

    await page.locator('//input[@name="username"]').fill(username);
    //For checking value username
    console.log("Value Username " + username)
    await page.locator('//input[@name="password"]').fill(password);
    //For checking value password
    console.log("Value Password " + password)
    await page.locator('//button[@type="submit"]').click()
    const dashboardElement = await page.getByRole('heading', { name: 'Dashboard' })
    await expect(dashboardElement).toBeVisible();
    await page.locator('//span[@class="oxd-userdropdown-tab"]').click()
    await page.locator('(//a[@role="menuitem"])[4]').click()
    await expect(page).toHaveURL(baseURL)

});

