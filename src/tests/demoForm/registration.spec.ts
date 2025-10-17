import test, { expect } from "@playwright/test";
import { NOTIFICATIONS, registrationInvalidData, user, userData, validRegistrData } from "./test-data/test-data";

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
    await expect(messageOnRegisterForm).toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);
  });

  test("Should register with valid min length username and min length password", async ({ page }) => {
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const { username, password } = validRegistrData[1];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    await expect(messageOnRegisterForm).toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);
  });

  test("Should register with valid max length username and max length password", async ({ page }) => {
    const userNameOnRegisterField = page.locator("#userNameOnRegister");
    const passwordOnRegisterField = page.locator("#passwordOnRegister");
    const registerButtonOnRegForm = page.locator("#register");
    const messageOnRegisterForm = page.locator("#errorMessageOnRegister");
    const { username, password } = validRegistrData[2];
    await userNameOnRegisterField.fill(username);
    await passwordOnRegisterField.fill(password);
    await registerButtonOnRegForm.click();
    await expect(messageOnRegisterForm).toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);
  });
});

test.describe("[anatoly-karpovich] [registration SMOKE]", () => {
  test("Check registration on anatoly-karpovich.github.io/demo-registration-form", async ({ page }) => {
    const URL = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const pageTitle = page.locator("h2");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const address = page.locator("#address");
    const email = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator('[value="male"]');
    const checkbox = (value: string) => page.locator(`[value=${value}]`);
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const year = page.locator("#year");
    const month = page.locator("#month");
    const day = page.locator("#day");
    const password = page.locator("#password");
    const confirmPassword = page.locator("#password-confirm");
    const submitButton = page.locator('[type="submit"]');
    const title = page.locator("//h2[contains(text(), 'Registration Details')]");
    const fullNameDetails = page.locator("#fullName");
    const genderDetails = page.locator("#gender");
    const hobbiesDetails = page.locator("#hobbies");
    const dateOfBirth = page.locator("#dateOfBirth");

    await page.goto(URL);
    await expect(pageTitle).toHaveText("Register");
    await firstName.fill(user.firstName);
    await lastName.fill(user.lastName);
    await address.fill(user.address);
    await email.fill(user.email);
    await phone.fill(user.phone);
    await country.selectOption(user.country);
    await gender.check();
    await expect(gender).toBeChecked();

    for (const hobby of user.hobbies) {
      await checkbox(hobby).check();
      await expect(checkbox(hobby)).toBeChecked();
    }

    await language.fill(user.language);
    await skills.selectOption(user.skills);
    await expect(skills).toHaveValues(user.skills);

    await year.selectOption(user.yearOfBirth);
    await month.selectOption(user.monthOfBirth);
    await day.selectOption(user.dayOfBirth);

    await password.fill(user.password);
    await confirmPassword.fill(user.password);
    await submitButton.click();
    await expect(title).toHaveText("Registration Details");

    await expect(email).toHaveText(user.email);
    await expect(fullNameDetails).toHaveText(`${user.firstName} ${user.lastName}`);
    await expect(address).toHaveText(user.address);
    await expect(phone).toHaveText(user.phone);
    await expect(country).toHaveText(user.country);
    await expect(genderDetails).toHaveText(user.gender.toLocaleLowerCase());
    await expect(language).toHaveText(user.language);
    await expect(skills).toHaveText(user.skills.join(", "));
    await expect(hobbiesDetails).toHaveText(user.hobbies.join(", "));
    await expect(dateOfBirth).toHaveText(`${user.dayOfBirth} ${user.monthOfBirth} ${user.yearOfBirth}`);
    expect((await password.innerText()).length).toBe(user.password.length);
  });
});

test.describe("[Demo Login Form] [Registration]", () => {
  const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
  for (const { title, credentials, successMessage } of userData) {
    test(title, async ({ page }) => {
      await page.goto(URL);
      const button = page.locator('.loginForm [value="Register"]');
      await expect(button).toBeVisible();
      await button.click();
      const registerform = page.locator(".registerForm");
      const registerFormTitle = registerform.locator("#registerForm");
      const usernameInput = registerform.locator('[type="text"]');
      const passwordInput = registerform.locator('[type="password"]');
      const registerButton = registerform.locator('[type="submit"]');
      const { username, password } = credentials;
      const message = registerform.locator("h4");
      await expect(registerFormTitle).toBeVisible();
      await usernameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(message).toHaveText(successMessage);
    });
  }
});

test.describe("[Demo Login Form] [Invalid Registration]", () => {
  const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
  for (const { username, password, title, errorMessage } of registrationInvalidData) {
    test(title, async ({ page }) => {
      const loginForm = page.locator(".loginForm");
      const registerForm = page.locator(".registerForm");
      const registerButtonOnLoginForm = loginForm.locator("#registerOnLogin");
      const registerButtonRegisterForm = registerForm.locator("#register");
      const errorMessageOnRegisterForm = registerForm.locator("#errorMessageOnRegister");
      const usernameField = registerForm.locator("#userNameOnRegister");
      const passwordField = registerForm.locator("#passwordOnRegister");

      await page.goto(URL);
      await page.evaluate(() => {
        localStorage.setItem("existingUser", JSON.stringify({ name: "existingUser", password: "andPassword" }));
        const passwordElement = document.querySelector("#passwordOnRegister")!;
        const usernameElement = document.querySelector("#userNameOnRegister")!;
        passwordElement.setAttribute("maxlength", "21");
        usernameElement.setAttribute("maxlength", "41");
      });
      await expect(loginForm, "login form is displayed").toBeVisible();
      await expect(registerButtonOnLoginForm, "register button is displayed").toBeVisible();
      await registerButtonOnLoginForm.click();
      await passwordField.getAttribute("maxlength");
      await expect(registerForm, "register form is displayed").toBeVisible();
      await expect(registerButtonRegisterForm, "register button is displayed").toBeVisible();
      await usernameField.fill(username);
      await passwordField.fill(password);
      await registerButtonRegisterForm.click();
      await expect(errorMessageOnRegisterForm, "check error message").toHaveText(errorMessage);
    });
  }
});
