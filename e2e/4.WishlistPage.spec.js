import { test } from "@playwright/test";
import { LoginPage } from "../support/pageObjects/LoginPage.js";
import { WishlistPage } from "../support/pageObjects/WishlistPage.js";

test("Add product to favorites", async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoHomePage();
  const wishlist = new WishlistPage(page);
  await wishlist.addItem();
  await wishlist.removeItem();
});
