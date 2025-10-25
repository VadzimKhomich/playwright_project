import test, { expect } from "@playwright/test";

test.describe("[Heroku App] [Dynamic Loading]", () => {
  test("Get by text and role", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com";
    await page.goto(URL);
    const link = page.getByRole("link", { name: "Dynamic Loading" });
    const heading = page.getByRole("heading", { level: 3 });
    const expectedText = "Dynamically Loaded Page Elements";
    await link.click();
    await expect(heading).toHaveText(expectedText);
    const example1 = page.getByText("Example 1:", { exact: false });
    await expect(example1).toBeVisible();
  });

  test("Get by lable", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com";
    await page.goto(URL);
    const link = page.getByRole("link", { name: "Form Authentication" });
    await link.click();
    await page.getByLabel("username").fill("tomsmith");
    await page.getByLabel("password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "login" }).click();
  });

  // test("Advanced locators", async ({page}) => {
  //     const URL = "https://anatoly-karpovich.github.io/demo-login-form/"
  //     await page.goto(URL)
  //     const form = page.locator('form', {
  //         // hasText: "",
  //         // hasNotText:"",
  //         has: page.locator("input#userName")

  //     })
  //     const usrnameIntop = form.locator("input#userName")
  // })

  //   npx playwright codegen https://anatoly-karpovich.github.io/demo-login-form/

  test("Waits with expects", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com";
    await page.goto(URL);
    await page.locator('[href="/dynamic_loading"]').click();
    await page.locator('[href="/dynamic_loading/2"]').click();
    await page.locator("#start button").click();
    // const text = await page.locator("#finish").getByRole('heading', {level: 4}).innerText()
    // console.log(text)
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    // await expect(heading).toBeVisible({timeout: 20000})
    const loader = page.locator("#loading");
    await expect(loader).toBeVisible();
    // const isDisplayed = await loader.isVisible()
    // console.log(isDisplayed)
    await expect(loader, "waitiing for loading bar to disappear").toBeVisible({
      visible: false,
      timeout: 20000,
    });
    await expect(heading).toHaveText("Hello World!");
  });

  test("Explisit wait", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com/dynamic_loading";
    await page.goto(URL);
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.locator("#start button").click();
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    await heading.waitFor({ state: "visible", timeout: 20000 });
    await expect(heading).toHaveText("Hello World!");
  });

  test("Custom waits", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com/dynamic_controls";
    await page.goto(URL);
    await page.getByRole("button", { name: "Remove" }).click();
    // input[label="blah"]
    //"#checkbox-example > button"
    //p#message

    await page.waitForFunction(
      (selectors: { checkbox: string; button: string; label: string }) => {
        const checkbox = document.querySelector(selectors.checkbox);
        const buttonText = document.querySelector(selectors.button)?.textContent;
        const message = document.querySelector(selectors.label)?.textContent;

        return !checkbox && buttonText === "Add" && message === "It's gone!";
      },
      {
        checkbox: 'input[label="blah"]',
        button: "#checkbox-example > button",
        label: "p#message",
      },
      { timeout: 10000 },
    );
  });

  test("Soft", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com/checkboxes";
    await page.goto(URL);
    await expect(page.getByRole("heading", { level: 3 })).toHaveText("Checkboxes");
    const form = page.locator("form#checkboxes");
    const formText = await form.innerText();
    const checkboxesTexts = formText!.split("\n").map((el) => el.trim());
    expect.soft(checkboxesTexts[0], "checkbox1 await").toBe("checkbox 1");
    expect.soft(checkboxesTexts[1], "checkbox2 await").toBe("checkbox 2");
  });
});
