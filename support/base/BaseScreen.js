import { chromium, expect } from "@playwright/test";

module.exports = async (config) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://practice.qabrains.com/ecommerce");
  await page.locator("button[type='submit']").click();
  await page.locator("#email").fill("practice@qabrains.com");
  await page.locator("#password").fill("Password123");
  await page.locator("button[type='submit']").click();

  //   save session
  await page.context().storageState({ path: "test_data/auth.json" });
};
