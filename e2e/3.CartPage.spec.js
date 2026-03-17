import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";
import { CartPage } from "../support/pageObjects/CartPage.js";

test("Cart Page Test", async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoHomePage();
  const cart = new CartPage(page);
  await cart.addAnItem();
  await cart.removeAnItem();
  await cart.addItems();
  await cart.removeItems();
  await cart.addQuantity();
  await cart.removeQuantity();
});
