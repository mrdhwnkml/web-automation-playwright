import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import * as dotenv from "dotenv";
import { saveToLocalStorageAndFile } from "../utils/helper";
import { generateUserData, generatePassword } from "../utils/dataGenerator";
import { faker } from "@faker-js/faker";

dotenv.config();

const username = faker.string.alpha({
  length: { min: 1, max: 10 },
});

const age = faker.number.int({ min: 1, max: 99 });
const baseURL = process.env.BASE_URL;

test("User not able to add username with fill age with 0", async ({
  page,
  context,
  login,
}) => {
  // Add
  await page.getByRole("button", { name: "Add ➕" }).click();
  await page.getByTestId("username-input").fill(username);
  await page.getByTestId("age-input").fill("0");
  await page.getByTestId("submit-button").click();

  // Assertion
  const actualToastText = await page.getByTestId("toast-content").textContent();
  expect(actualToastText).toBe(`Age cannot be negative.`);

  await test.info().attach("Screenshot", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});

test("User not able to add username with existing user", async ({
  page,
  context,
  login,
}) => {
  // Add
  await page.getByRole("button", { name: "Add ➕" }).click();
  await page.getByTestId("username-input").fill("Ridhwan");
  await page.getByTestId("age-input").fill(age.toString());
  await page.getByTestId("submit-button").click();

  //Assertion
  const actualToastText = await page.getByTestId("toast-content").textContent();
  expect(actualToastText).toBe(`Username "Ridhwan" already exists!`);
  await test.info().attach("Screenshot", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});

test("User should be see confetti if input correct username", async ({
  page,
  context,
  login,
}) => {
  // Add
  await page.getByRole("button", { name: "Add ➕" }).click();
  await page.getByTestId("username-input").fill("mrdhwnkml");
  await page.getByTestId("age-input").fill(age.toString());
  await page.getByTestId("submit-button").click();

  //Assertion
  const actualToastText = await page.getByTestId("toast-content").textContent();
  expect(actualToastText).toBe(
    `Congratulations, you have unlocked the Hidden Secret! DM me on Discord to claim your prize. 🎉🎊🍾`
  );
  await test.info().attach("Screenshot", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});
