import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";
import { invalidCreateProductData, validCreateProductData } from "data/products/testDataApi";
import { ERROR_MESSAGES } from "data/notifications/notifications";

test.describe("[API] [Sales Portal] [Products valid data]", () => {
  let token = "";
  let id = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const { title, product } of validCreateProductData) {
    test(title, async ({ productsAPI, loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
      const response = await productsAPI.create(product, token);

      validateResponse(response, {
        status: STATUSES_CODES.CREATED,
        IsSuccess: true,
        ErrorMessage: null,
        schema: createProductSchema,
      });
      const actualProductData = response.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(product);
      id = actualProductData._id;
    });
  }
});

test.describe("[API] [Sales Portal] [Products invalid data]", () => {
  for (const { title, product } of invalidCreateProductData) {
    test(title, async ({ productsAPI, loginApiService }) => {
      const token = await loginApiService.loginAsAdmin();
      const response = await productsAPI.create(product, token);
      validateResponse(response, {
        status: STATUSES_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: ERROR_MESSAGES.INCORRECT_BODY,
      });
    });
  }

  test("Should NOT create product with name when product already exists", async ({
    loginApiService,
    productsApiService,
    productsAPI,
  }) => {
    const token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const product = await productsApiService.create(token, productData);
    const productDataSameName = generateProductData({ name: product.name });
    const response = await productsAPI.create(productDataSameName, token);
    validateResponse(response, {
      status: STATUSES_CODES.CONFLICT,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.EXISTS_PRODUCT(product.name),
    });
    const id = product._id;
    await productsApiService.delete(token, id);
  });
});
