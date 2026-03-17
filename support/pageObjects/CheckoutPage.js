const { expect } = require("@playwright/test");
import locator from "../../fixtures/checkout/locator.json";
import txt from "../../fixtures/checkout/txt.json";

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async checkOut() {
    await this.page.locator(locator.addToCart).click();
    await this.page.waitForSelector(locator.cartBadge);
    await expect(this.page.locator(locator.cartBadge)).toHaveText("1");
    await this.page.locator(locator.cartIcon).click();
    await this.page.locator(locator.checkoutBtn).click();
    await this.page.getByText(txt.cancelBtn).click();
    await this.page.locator(locator.checkoutBtn).click();
    await expect(this.page.locator(locator.email)).toBeDisabled();
    await this.page.getByPlaceholder(txt.firstname).fill(txt.fName);
    await this.page.getByPlaceholder(txt.lastname).fill(txt.lName);
    await this.page.locator(locator.zipcode).fill(txt.zipCode);
    await this.page.locator(locator.contBtn).click();
    const totalPrice = await this.page
      .locator(locator.totalPrice)
      .textContent();
    const Tprice = totalPrice.replace("$", "");
    const itemTotalPrice = await this.page
      .locator(locator.itemTotalPrice)
      .textContent();
    const ITprice = itemTotalPrice.replace("Item Total : $", "");
    expect(Tprice).toEqual(ITprice);
    await this.page.locator(locator.finishBtn).click();
    await expect(this.page.getByText(txt.congratulatoryMsg)).toBeVisible();
    await this.page.locator(locator.contShoppingBtn).click();
    await this.page.waitForSelector(locator.products)
    await expect(this.page.locator(locator.products).first()).toBeVisible();
  }
};
