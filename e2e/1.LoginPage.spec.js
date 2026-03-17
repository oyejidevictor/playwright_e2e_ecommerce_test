import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";
import txt from "./../fixtures/login/txt.json";

test.describe("Validate user authentication", () => {
  test("User should not log in with invalid credentials but should log in successfully with valid credentials", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.gotoHomePage();
    await login.logout();
    await login.invalidLogin(txt.invalidEmail, txt.invalidPassword);
    await login.validLogin(txt.validEmail, txt.validPassword);
  });
});
