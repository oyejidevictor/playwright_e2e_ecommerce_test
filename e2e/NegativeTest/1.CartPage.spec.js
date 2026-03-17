import { test } from "@playwright/test";
import { LoginPage } from "../../support/pageObjects/LoginPage.js";
import { CartPage } from "../../support/pageObjects/NegativeTest/CartPage.js";

test.describe('Application handles actions without errors', () => {
  test("Rapid Add/Remove item", async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoHomePage();
    const cart = new CartPage(page);
    await cart.rapidAddAndRemoveItem();
  });
})
