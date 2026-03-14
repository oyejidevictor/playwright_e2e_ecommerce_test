import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";

test.describe("Validate user authentication", () => {
  test("User should not log in with invalid credentials but should log in successfully with valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHomePage();
    await login.logout();
    await login.invalidLogin("practice@qabrains.com", "WrongPassword123");
    await login.validLogin("practice@qabrains.com", "Password123");
  });
});