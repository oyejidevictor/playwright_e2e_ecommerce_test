import { expect } from "@playwright/test";
import locator from "../../fixtures/login/locator.json";

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async gotoHomePage() {
    await this.page.goto("https://practice.qabrains.com/ecommerce");
  }

  async logout() {
    await this.page.locator(locator.profileDropdown).click();
    await this.page.locator(locator.logoutBtn).click();
    await expect(this.page.locator(locator.logoutDialog)).toContainText(
      locator.confirmText,
    );
    await this.page.locator(locator.closeBtn).click();
    await this.page.locator(locator.profileDropdown).click();
    await this.page.locator(locator.logoutBtn).click();
    await this.page.locator(locator.confirmLogoutBtn).click();
    await expect(this.page.locator(locator.loginButton)).toBeVisible();
    await this.page.waitForTimeout(5000);
  }

  async invalidLogin(email, password) {
    await this.page.fill(locator.emailInput, email);
    await this.page.fill(locator.passwordInput, password);
    await this.page.click(locator.loginButton);
    await this.page.waitForSelector(locator.toastError, {
      state: "visible",
    });
    expect(this.page.locator(locator.toastError)).toHaveText(
      locator.toastErrorMsg,
    );
  }

  async validLogin(email, password) {
    await this.page.fill(locator.emailInput, email);
    await this.page.fill(locator.passwordInput, password);
    await this.page.click(locator.eyeBtn);
    await this.page.waitForTimeout(1000);
    expect(this.page.locator(locator.passwordInput)).toHaveAttribute(
      "type",
      "text",
    );
    await this.page.click(locator.loginButton);
    await expect(this.page).toHaveURL("https://practice.qabrains.com/ecommerce"); 
  }

};




