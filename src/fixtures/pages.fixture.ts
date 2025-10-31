import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProductsPage";
import { ProductsListPage } from "ui/pages/products/productsLists.page";
import { SignInPage } from "ui/pages/signIn.page";

interface IPages {
  homePage: HomePage;
  productsPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  signInPage: SignInPage;
}

const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },

  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

export { test, expect };
