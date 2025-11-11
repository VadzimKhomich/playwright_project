import { test as base, expect } from "@playwright/test";
import { RequestApi } from "api/apiClients/requestApi";
import { ProductsAPI } from "api/api/products.api";
import { LoginAPI } from "api/api/login.api";
import { ProductsApiServices } from "api/services/products.service";
import { LoginService } from "api/services/login.service";

interface IApi {
  //api
  productsAPI: ProductsAPI;
  loginAPI: LoginAPI;
  //services
  productsApiService: ProductsApiServices;
  loginApiService: LoginService;
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
  //services
  productsApiService: async ({ productsAPI }, use) => {
    await use(new ProductsApiServices(productsAPI));
  },

  loginApiService: async ({ loginAPI }, use) => {
    await use(new LoginService(loginAPI));
  },
});

export { test, expect };
