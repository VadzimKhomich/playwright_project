import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/notifications/notifications";
import { generateProductData } from "data/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { ProductDetailModal } from "ui/pages/modals/products/product.detail.modal";
import { AddNewProductPage } from "ui/pages/products/addNewProductsPage";
import { ProductsListPage } from "ui/pages/products/productsLists.page";
import { SignInPage } from "ui/pages/signIn.page";

test.describe("[Sales Portal] [Products]", async () => {
  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productsListPage = new ProductsListPage(page);
    const signInPage = new SignInPage(page);
    const productDetailModal = new ProductDetailModal(page);

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
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    const producFromTable = await productsListPage.getProductDataFromTable(productData.name);
    expect(productData).toEqual(expect.objectContaining(producFromTable));
    await productsListPage.clickOnActionButton(productData.name, "Details");
    await productDetailModal.waitForOpened();
    const productFromDetailModal = await productDetailModal.getProductFromDetails();
    expect(productFromDetailModal).toEqual(productData);
  });
});
