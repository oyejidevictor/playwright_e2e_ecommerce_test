import { expect } from "@playwright/test";
import locator from "../../fixtures/wishlist/locator.json";
import txt from "../../fixtures/wishlist/txt.json";

exports.WishlistPage = class WishlistPage {
  constructor(page) {
    this.page = page;
  }

  async addItem() {
    await this.page.locator(locator.favIcon).click();
    await expect(this.page.locator(locator.toast)).toHaveText(txt.toastAddTxt);
    await this.page.locator(locator.profileDropdown).click();
    await this.page.waitForSelector(locator.favBtn);
    await this.page.locator(locator.favBtn).click();
    await expect(this.page.getByText(txt.emptyFavTxt)).toBeHidden();
    await expect(this.page.getByText(txt.productName)).toBeVisible();

    await this.page.locator(locator.product).click();
    await this.page.locator(locator.backToProduct).click();
    await this.page.locator(locator.product).click();

    await this.page.waitForSelector(locator.quantityValue);
    await expect(this.page.locator(locator.quantityValue)).toHaveValue("1");
    await this.page.locator(locator.decreaseQuantityBtn).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveValue("1");
    await this.page.locator(locator.increaseQuantityBtn).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveValue("2");
    await this.page.locator(locator.decreaseQuantityBtn).click();
    await expect(this.page.locator(locator.quantityValue)).toHaveValue("1");

    await this.page.waitForTimeout(5000);
    await this.page.getByText(txt.addToCart).click();
    await expect(this.page.locator(locator.toast)).toHaveText(
      txt.toastAddToCart,
    );
    await this.page.waitForSelector(locator.cartBadge);
    await expect(this.page.locator(locator.cartBadge)).toHaveText("1");
  }

  async removeItem() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(locator.profileDropdown).click();
    await this.page.locator(locator.favBtn).click();
    await this.page.waitForSelector(locator.favRedIcon);
    await this.page.locator(locator.favRedIcon).click();
    await expect(this.page.locator(locator.toast)).toHaveText(txt.toastRmvTxt);
    await this.page.getByText(txt.emptyFavTxt).click();
    await expect(this.page.getByText(txt.emptyFavTxt)).toBeVisible();
    await this.page.locator(locator.contBtn).click();
  }
};
