const { expect } = require("@playwright/test");
import locator from "../../../fixtures/cart/locator.json";

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
  }

  async rapidAddAndRemoveItem() {
    for (let i = 0; i < 10; i++) {
      await expect(this.page.locator(locator.cartBadge)).toBeHidden();
      await this.page.locator(locator.addToCart).click();
      await expect(this.page.locator(locator.cartBadge)).toHaveText("1");
      await this.page.locator(locator.addToCart).click();
    }
  }
};
