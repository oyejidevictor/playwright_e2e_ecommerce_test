const { expect } = require("@playwright/test");
import locator from "../../fixtures/homepage/locator.json";

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
  }

  async productDisplay() {
    await expect(this.page.locator(locator.username)).toHaveText(
      "practice@qabrains.com",
    );
    const products = this.page.locator(locator.products);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
      await expect(products.nth(i)).toBeVisible();
      // const textPhrase = await products
      //   .nth(i)
      //   .locator(locator.productTitle)
      //   .textContent();
      // console.log(textPhrase);
    }
  }

  async orderAscending() {
    await this.page.locator(locator.orderBtn).click();
    await this.page.locator(locator.searchField).fill("asc");
    await this.page.locator(locator.searchResult).click();
    await this.page.waitForTimeout(3000);
    const names = await this.page.locator(locator.productTitle).allInnerTexts();

    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    console.log("Actual:", names);
    console.log("Sorted:", sorted);

    expect(names).toEqual(sorted);

  }

  async orderDescending() {
    await this.page.locator(locator.orderBtn).click();
    await this.page.locator(locator.searchField).fill("dsc");
    await this.page.locator(locator.searchResult).click();
    await this.page.waitForTimeout(3000);
    const names = await this.page.locator(locator.productTitle).allInnerTexts();

    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    console.log("Actual:", names);
    console.log("Sorted:", sorted);

    expect(names).toEqual(sorted);

  }

  async orderLtoHPrice() {
    await this.page.locator(locator.orderBtn).click();
    await this.page.locator(locator.searchField).fill("low");
    await this.page.locator(locator.searchResult).click();
    await this.page.waitForTimeout(3000);
    const prices = await this.page.locator(locator.productPrice).allInnerTexts();

    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

    const sorted = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sorted);

  }

  async orderHtoLPrice() {
    await this.page.locator(locator.orderBtn).click();
    await this.page.locator(locator.searchField).fill("high");
    await this.page.locator(locator.searchResult).click();
    await this.page.waitForTimeout(3000);
    const prices = await this.page.locator(locator.productPrice).allInnerTexts();

    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

    const sorted = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sorted);
  }
};
