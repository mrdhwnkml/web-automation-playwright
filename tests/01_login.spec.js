import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import * as dotenv from "dotenv";
import { saveToLocalStorageAndFile } from "../utils/helper";
import { generateUserData, generatePassword } from "../utils/dataGenerator";


dotenv.config();

const baseURL = process.env.BASE_URL;
const username = process.env.USERNAMES;
const password = process.env.PASSWORD;


test("User should be able to login", async ({
  page,

}) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.getByTestId('username-input').fill(username);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL('https://belajar-bareng.onrender.com/users');
});
