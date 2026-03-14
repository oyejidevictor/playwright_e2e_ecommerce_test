const { expect } = require("@playwright/test");
import locator from "../../fixtures/homepage/locator.json";

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
  }

  async productDisplay() {
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(locator.username)).toHaveText(
      "practice@qabrains.com",
    );
    const products = this.page.locator(locator.products);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
      await expect(products.nth(i)).toBeVisible();
    }

    await expect(this.page.locator(locator.favBtn)).toBeVisible();
    await expect(this.page.locator(locator.productTitle)).toBeVisible();
    await expect(this.page.locator(locator.productDescription)).toBeVisible();
    await expect(this.page.locator(locator.productPrice)).toBeVisible();
    await expect(this.page.locator(locator.addToCartBtn)).toBeVisible();
  }
};
