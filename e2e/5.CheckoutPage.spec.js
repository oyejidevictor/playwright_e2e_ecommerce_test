import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";
import { CheckoutPage } from "../support/pageObjects/CheckoutPage.js";

test("Checkout Page Test", async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoHomePage();
  const checkout = new CheckoutPage(page);
  await checkout.checkOut();
});
