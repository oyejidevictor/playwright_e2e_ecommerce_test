import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";
import { HomePage } from "../support/pageObjects/Homepage.js";

test.describe("Validate product display on homepage", () => {
  test("Homepage product Test", async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    await login.gotoHomePage();
    await home.productDisplay();
  });
});
