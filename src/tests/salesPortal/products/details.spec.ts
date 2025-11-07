import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", async () => {
  test("Product Details", async ({ homePage, productsPage, addNewProductPage, signInPage }) => {

    await signInPage.open();
    await signInPage.fillCredentials(credentials);
    await signInPage.clickLogin();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsPage.waitForOpened();
    await productsPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsPage.waitForOpened();
    await expect(productsPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsPage.tableRowByName(productData.name)).toBeVisible();
  });
});
