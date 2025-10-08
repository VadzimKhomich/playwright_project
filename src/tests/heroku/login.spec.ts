import test, { expect } from "@playwright/test";
import { before, beforeEach } from "node:test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  LOGIN_SUCCESS = "You logged into a secure area!",
  LOGOUT_SUCCESS = "You logged out of the secure area!",
  INVALID_PASSWORD = "Your password is invalid!",
  INVALID_USERNAME = "Your username is invalid!",
}

test.describe("[Heroku App] [Form Authentification]", () => {
  const validCredentials: ICredentials = {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  };

  const invalidCredentials: ICredentials[] = [
    {
      username: "tomsmith",
      password: "Supe",
    },
    {
      username: "tomsmithdwewe",
      password: "SuperSecretPassword!",
    },
    {
      username: "tomsmith",
      password: "",
    },
    {
      username: "",
      password: "SuperSecretPassword!",
    },
    {
      username: "",
      password: "",
    },
  ];

  test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com";
    const loginLink = page.locator('a[href="/login"]');
    await page.goto(url);
    await loginLink.click();
  });

  test("Should login with valid credentials", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const securePageTitle = page.locator("h2");

    await userNameInput.fill(validCredentials.username);
    await userPasswordInput.fill(validCredentials.password);
    await loginButton.click();
    await expect(notification).toBeVisible();
    const actualText = (await notification.innerText()).replace("×", " ").trim();
    console.log(actualText)
    expect(actualText).toBe(NOTIFICATIONS.LOGIN_SUCCESS);
    await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);
    await expect(securePageTitle).toContainText("Secure Area");
  });

  test("Should logout", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const logoutButton = page.locator('[href="/logout"]');
    const pageTitle = page.locator("h2");
    //pre condition
    await userNameInput.fill(validCredentials.username);
    await userPasswordInput.fill(validCredentials.password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);
    //act
    await logoutButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.LOGOUT_SUCCESS);
    await expect(pageTitle).toHaveText("Login Page");
  });

  test("Should NOT login with invalid password", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    //pre condition
    const { username, password } = invalidCredentials[0];
    await userNameInput.fill(username);
    await userPasswordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
  });

  test("Should NOT login with invalid username", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const logoutButton = page.locator('[href="/logout"]');
    const pageTitle = page.locator("h2");
    //pre condition
    const { username, password } = invalidCredentials[1];
    await userNameInput.fill(username);
    await userPasswordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
  });

  test("Should NOT login with blank password", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const logoutButton = page.locator('[href="/logout"]');
    const pageTitle = page.locator("h2");
    //pre condition
    const { username, password } = invalidCredentials[2];
    await userNameInput.fill(username);
    await userPasswordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
  });

  test("Should NOT login with blank username", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const logoutButton = page.locator('[href="/logout"]');
    const pageTitle = page.locator("h2");
    //pre condition
    const { username, password } = invalidCredentials[3];
    await userNameInput.fill(username);
    await userPasswordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
  });

  test("Should NOT login with blank credentials", async ({ page }) => {
    const userNameInput = page.locator("#username");
    const userPasswordInput = page.locator("#password");
    const loginButton = page.locator('[type="submit"]');
    const notification = page.locator("#flash");
    const logoutButton = page.locator('[href="/logout"]');
    const pageTitle = page.locator("h2");
    //pre condition
    const { username, password } = invalidCredentials[3];
    await userNameInput.fill(username);
    await userPasswordInput.fill(password);
    await loginButton.click();
    await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
  });
});
