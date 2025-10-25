import test, { expect } from "@playwright/test";

test.describe("[Heroku App] [Dynamic Controls]", () => {
  test("Chreck dinamics element", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
    const removeButton = page.getByRole("button", { name: "Remove" });
    await expect.soft(removeButton, "Remove button is displayed").toBeVisible();
    await expect.soft(page.getByRole("heading", { name: "Dynamic Controls" }), "Title is displayed").toBeVisible();
    const checkbox = page.locator('[label="blah"]');
    await checkbox.check();
    await expect.soft(checkbox, "Checkbox is cheched").toBeChecked();
    await removeButton.click();
    await expect.soft(checkbox, "Checkbox is not displayed").not.toBeVisible();
    const addButton = page.getByRole("button", { name: "Add" });
    await expect.soft(addButton, "Add button is displayed").toBeVisible();
    const message = page.locator("p#message");
    await expect.soft(message, "Check message").toHaveText("It's gone!");
    await addButton.click();
    await expect.soft(page.locator("#checkbox"), "Checkbox is cheched").toBeVisible();
    await expect.soft(message, "Check message").toHaveText("It's back!");
  });
});
