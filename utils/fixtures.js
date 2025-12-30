import { test as baseTest, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
const username = process.env.USERNAMES;
const password = process.env.PASSWORD;


// Membuat fungsi login
async function login(page) {
    await page.goto(baseURL);
    await page.locator('//input[@name="username"]').fill(username);
    await page.locator('//input[@name="password"]').fill(password);
    await page.locator('//button[@type="submit"]').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

}

// Mendefinisikan fixture
export const test = baseTest.extend({
    login: async ({ page }, use) => {
        // Menjalankan fungsi login
        await login(page);
        // Menggunakan login di test
        await use(page);
    }
});
