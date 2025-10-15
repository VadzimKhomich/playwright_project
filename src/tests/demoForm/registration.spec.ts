import test, { expect } from "@playwright/test";
import { NOTIFICATIONS, user, validRegistrData } from "./test-data/test-data";

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
