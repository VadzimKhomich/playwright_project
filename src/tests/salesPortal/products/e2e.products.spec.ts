import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";
import { test, expect } from "fixtures/pages.fixture";
import _ from "lodash";

test.describe("[Sales Portal] [e2e] [Products]", () => {
  test("e2e product", async ({ homePage, productsPage, addNewProductPage, signInPage }) => {
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
    await productsPage.closeNotification();
    await expect(productsPage.tableRowByName(productData.name)).toBeVisible();
    const producFromTable = await productsPage.getProductDataFromTable(productData.name);
    const expectProduct = _.omit(productData, ["amount", "notes"]);
    const actualProduct = _.omit(producFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectProduct);
    const { deleteModal } = productsPage;
    await productsPage.clickOnActionButton(productData.name, "Delete");
    await deleteModal.clickDeleteButton();
    await expect(productsPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await productsPage.closeNotification();
    await expect(productsPage.tableRowByName(productData.name)).not.toBeVisible();
  });
});
