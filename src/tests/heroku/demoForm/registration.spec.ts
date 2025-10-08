import test, { expect } from "@playwright/test";

interface IUser {
  username: string;
  password: string;
}

const NOTIFICATIONS = {
  SUCCESS_REGISTER:
    "Successfully registered! Please, click Back to return on login page",
  SUCCESS_LOGIN: (userName: string) => `Hello, ${userName}!`,
} as const;

const validRegistrData: IUser[] = [
  {
    username: "someUserName",
    password: "somePassword",
  },
  {
    username: "som",
    password: "somePasw",
  },
  {
    username: "someUserNameWithfortysymbolsersdfvljesdnw",
    password: "somePaswwertyuioplkj",
  },
];

test.describe("[anatoly-karpovich] [registration]", () => {
  test.beforeEach(async ({ page }) => {
    const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerButton = page.locator("#registerOnLogin");
    const registrationFormTitle = page.locator("#registerForm");
    await page.goto(URL);
    await registerButton.click();
    await expect(registrationFormTitle).toContainText("Registration");
  });
  test("Should register with valid username and password", async ({ page }) => {
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const { username, password } = validRegistrData[0];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    await expect(messageOnRegisterForm).toHaveText(
      NOTIFICATIONS.SUCCESS_REGISTER
    );
  });

  test("Should register with valid min length username and min length password", async ({
    page,
  }) => {
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const { username, password } = validRegistrData[1];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    await expect(messageOnRegisterForm).toHaveText(
      NOTIFICATIONS.SUCCESS_REGISTER
    );
  });

  test("Should register with valid max length username and max length password", async ({
    page,
  }) => {
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const { username, password } = validRegistrData[2];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    await expect(messageOnRegisterForm).toHaveText(
      NOTIFICATIONS.SUCCESS_REGISTER
    );
  });
});

test.describe("[anatoly-karpovich] [registration smoke]", () => {
  test("Check register user", async ({ page }) => {
    const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerButton = page.locator("#registerOnLogin");
    const registrationFormTitle = page.locator("#registerForm");
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const backButton = page.locator("#backOnRegister");
    const userNameOnLoginField = page.locator("#userName");
    const passwordOnLoginField = page.locator("#password");
    const submitButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");
    //registration
    await page.goto(URL);
    await registerButton.click();
    await expect(registrationFormTitle).toContainText("Registration");
    const { username, password } = validRegistrData[0];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    //check registration
    await expect(messageOnRegisterForm).toHaveText(
      NOTIFICATIONS.SUCCESS_REGISTER
    );
    //check login
    await backButton.click();
    await userNameOnLoginField.fill(username);
    await passwordOnLoginField.fill(password);
    await submitButton.click();
    await expect(successMessage).toHaveText(
      NOTIFICATIONS.SUCCESS_LOGIN(username)
    );
  });
});
