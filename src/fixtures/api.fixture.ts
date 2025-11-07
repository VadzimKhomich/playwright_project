import { test as base, expect } from "@playwright/test";
import { RequestApi } from "api/apiClients/requestApi";
import { ProductsAPI } from "api/api/products.api";
import { LoginAPI } from "api/api/login.api";

interface IApi {
  productsAPI: ProductsAPI;
  loginAPI: LoginAPI;
}

const test = base.extend<IApi>({
  productsAPI: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsAPI(apiClient);
    await use(api);
  },
  loginAPI: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginAPI(apiClient);
    await use(api);
  },
});

export { test, expect };
