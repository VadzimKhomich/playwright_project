import test, { expect } from "@playwright/test";

test.describe("[anatoly-karpovich] [login]", () => {
  const user = {
    name: "test@gmail.com",
    password: "SecretPw123!@#",
  };
  test("Check login after add cadentials to local storage", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.evaluate((user) => {
      localStorage.setItem(user.name, JSON.stringify(user));
    }, user);
    await page.locator("#userName").fill(user.name);
    await page.locator("#password").fill(user.password);
    await page.locator("#submit").click();

    await expect(page.locator("#successMessage"), "Check messege after login").toHaveText(`Hello, ${user.name}!`);
  });
});
