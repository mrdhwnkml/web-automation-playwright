import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import * as dotenv from "dotenv";
import { saveToLocalStorageAndFile } from "../utils/helper";
import { generateUserData, generatePassword } from "../utils/dataGenerator";

const userData = generateUserData();
const password = generatePassword(12);

dotenv.config();

const baseURL = process.env.BASE_URL;

test.skip("User add Employee should be success", async ({
  page,
  context,
  login,
}) => {
  await page.getByRole("link", { name: "PIM" }).click();
  await page.getByRole("button", { name: " Eklemek" }).click();
  await page.getByPlaceholder("First Name").fill(userData.firstName);
  await page.getByPlaceholder("Middle Name").fill(userData.middleName);
  await page.getByPlaceholder("Last Name").fill(userData.lastName);
  await page
    .locator('(//input[@class="oxd-input oxd-input--active"])[2]')
    .click();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await page
    .locator('//input[@class="oxd-input oxd-input--focus"]')
    .fill(userData.employeeId);

  //Create login detail
  await page.locator("form span").click();
  await page
    .locator('(//input[@class="oxd-input oxd-input--active"])[3]')
    .fill(userData.username);

  // Save to local storage
  await saveToLocalStorageAndFile(page, {
    key: "username",
    value: userData.username,
  });

  await page.locator('(//input[@type="password"])[1]').fill(password);
  await page.locator('(//input[@type="password"])[2]').fill(password);

  // Save to local storage
  await saveToLocalStorageAndFile(page, { key: "password", value: password });

  // Memverifikasi bahwa data telah disimpan ke local storage
  const storedUsername = await page.evaluate(() =>
    localStorage.getItem("username")
  );
  const storedPassword = await page.evaluate(() =>
    localStorage.getItem("password")
  );

  console.log("Stored Username in Local Storage:", storedUsername);
  console.log("Stored Password in Local Storage:", storedPassword);

  await page.locator('//button[@type="submit"]').click();
  const successMessage = page.locator("text=Successfully Saved", {
    state: "visible",
    timeout: 5000,
  });
  await expect(successMessage).toBeVisible();
});
