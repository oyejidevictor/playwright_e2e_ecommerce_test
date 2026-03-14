const { expect } = require("@playwright/test");
import locator from "../../fixtures/cart/locator.json";
import txt from "../../fixtures/cart/txt.json";

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
  }

  async addAnItem() {
    await this.page.locator(locator.addToCart).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.locator(locator.toast)).toHaveText(txt.toastTxt);
    await this.page.waitForTimeout(1000);
    await expect(this.page.locator(locator.cartBadge)).toHaveText("1");
  }

  async removeAnItem() {
    await this.page.waitForTimeout(1000);
    await this.page.locator(locator.addToCart).click();
    await expect(this.page.locator(locator.cartBadge)).toBeHidden();
  }

  async addItems() {
    const products = this.page.locator(locator.products);
    //add 2 items
    for (let i = 0; i < 2; i++) {
      await products.nth(i).getByText(txt.addToCart).click();
    }
    await expect(this.page.locator(locator.cartBadge)).toHaveText("2");
  }

  async removeItems() {
    const products = this.page.locator(locator.products);
    //remove items
    for (let i = 0; i < 2; i++) {
      await products.nth(i).getByText(txt.removeFromCart).click();
    }
    await expect(this.page.locator(locator.cartBadge)).toBeHidden();
  }

  async addQuantity() {
    await this.page.locator(locator.addToCart).click();
    await this.page.locator(locator.cartIcon).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveText("1");
    await this.page.waitForTimeout(3000);
    await this.page.locator(locator.increaseQuantityBtn).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveText("2");
    const price = await this.page.locator(locator.price).textContent();
    let totalPrice = parseFloat(price.replace("$", "")) * 2;
    await expect(this.page.locator(locator.totalPrice)).toHaveText(
      `$${totalPrice.toFixed(2)}`,
    );
  }

  async removeQuantity() {
    await expect(this.page.locator(locator.quantityValue)).toHaveText("2");
    await this.page.locator(locator.decreaseQuantityBtn).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveText("1");
    const price = await this.page.locator(locator.price).textContent();
    let totalPrice = parseFloat(price.replace("$", "")) * 1;
    await expect(this.page.locator(locator.totalPrice)).toHaveText(
      `$${totalPrice.toFixed(2)}`,
    );
    await this.page.locator(locator.decreaseQuantityBtn).click();
    await expect(this.page.locator(locator.removeDialog)).toContainText(
      txt.removeText,
    );  
    await this.page.locator(locator.closeBtn).click();
    //Remove item by reducing quantity to 0
    await this.page.locator(locator.decreaseQuantityBtn).click();
    await this.page.locator(locator.removeBtn).click();
    await expect(this.page.getByText(txt.emptyCartTxt)).toBeVisible();
    await this.page.locator(locator.contShopBtn).click();
    //Remove item by clicking remove text button
    await this.addAnItem();
    await this.page.locator(locator.cartIcon).click();
    await this.page.locator(locator.removeTextBtn).click();
    await this.page.locator(locator.removeBtn).click();
    await expect(this.page.getByText(txt.emptyCartTxt)).toBeVisible();
    await this.page.waitForTimeout(5000);
  }
};
