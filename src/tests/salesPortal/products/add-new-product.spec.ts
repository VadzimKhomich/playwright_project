import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";
import _ from "lodash";
const s = 6

test.describe("[Sales Portal] [Products]", async () => {
  test("Add new product", async ({ homePage, productsPage, addNewProductPage, signInPage }) => {
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
    const producFromTable = await productsPage.getProductDataFromTable(productData.name);
    const expectProduct = _.omit(productData, ["amount", "notes"]);
    const actualProduct = _.omit(producFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectProduct);
    await productsPage.clickOnActionButton(productData.name, "Details");
    const { detailsModal } = productsPage;
    await detailsModal.waitForOpened();
    const productFromDetailModal = await detailsModal.getProductFromDetails();
    const actualProductFromDetails = _.omit(productFromDetailModal, ["createdOn"]);
    expect(actualProductFromDetails).toEqual(productData);
  });
});
