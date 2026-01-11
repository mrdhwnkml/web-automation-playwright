import { test as baseTest, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
const username = process.env.USERNAMES;
const password = process.env.PASSWORD;


// Membuat fungsi login
async function login(page) {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.getByTestId('username-input').fill(username);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('https://belajar-bareng.onrender.com/users');

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
