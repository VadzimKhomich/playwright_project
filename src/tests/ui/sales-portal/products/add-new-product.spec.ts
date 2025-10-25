import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProductsPage";
import { ProductsListPage } from "ui/pages/products/productsLists.page";

test.describe("[Sales Portal] [Products]", async () => {
  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productsListPage = new ProductsListPage(page);
    //login page
    const emailInput = page.locator("#emailinput");
    const passwordInput = page.locator("#passwordinput");
    const loginButton = page.locator("button[type='submit']");

    await homePage.open();
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await loginButton.click();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsPage.waitForOpened();
    await productsPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
