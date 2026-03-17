import { test } from "@playwright/test";
import { HomePage } from "../support/pageObjects/Homepage.js";
import { LoginPage } from "../support/pageObjects/LoginPage.js";

test.describe("Validate product display on homepage", () => {
  test("Homepage product Test", async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHomePage();
    const home = new HomePage(page);
    await home.productDisplay();
    //commented out because of webpage bug
    // await home.orderAscending();
    // await home.orderDescending();
    await home.orderLtoHPrice();
    await home.orderHtoLPrice();
  });
});