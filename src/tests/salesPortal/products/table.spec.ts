import { test, expect } from "fixtures/busibess.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";

test.describe("[Sales Portal] [Products]", () => {
  test("Table parsing", async ({ homePage, productsPage, addNewProductPage, loginAsAdmin }) => {
    await loginAsAdmin()
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
    const tableData = await productsPage.getTableData();
    console.log(tableData);
  });
});
