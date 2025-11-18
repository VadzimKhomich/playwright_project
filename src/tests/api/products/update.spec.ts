import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";
import { ERROR_MESSAGES } from "data/notifications/notifications";
import { errorSchema } from "data/shemas/core.shema";
import { MANUFACTURERS } from "data/products/manufactures";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";
  //delete product
  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Update product", async ({ loginApiService, productsAPI, productsApiService }) => {
    //Preconditions
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const creatredProduct = await productsApiService.create(token, productData);
    id = creatredProduct._id;
    //Action
    const updatedProductData = generateProductData();
    const updateProductResponse = await productsAPI.update(id, updatedProductData, token);
    //Assert
    validateResponse(updateProductResponse, {
      status: STATUSES_CODES.OK,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const updatedProduct = updateProductResponse.body.Product;
    expect(_.omit(updatedProduct, ["_id", "createdOn"])).toEqual(updatedProductData);
    expect(updatedProduct._id).toBe(id);
  });
});

test.describe("Not Smoke", () => {
  let token = "";
  const ids: string[] = [];
  //delete product
  test.afterEach(async ({ productsApiService }) => {
    if (ids.length) {
      for (const id of ids) {
        await productsApiService.delete(token, id);
      }
      ids.length = 0;
    }
  });
  //login
  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });
  test("Should not update product withoiut token", async ({ productsAPI, productsApiService }) => {
    const productData = generateProductData();
    const product = await productsApiService.create(token);
    const id = product._id;
    ids.push(id);

    const response = await productsAPI.update(id, productData, "");
    validateResponse(response, {
      status: STATUSES_CODES.UNAUTHORIZED,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.UNAUTHORIZED,
      schema: errorSchema,
    });
  });

  test("Shoud not update product with not existing id", async ({ productsAPI }) => {
    const id = "6919d2a604f3c2c26e650a9d";
    const response = await productsAPI.update(id, generateProductData(), token);
    validateResponse(response, {
      IsSuccess: false,
      status: STATUSES_CODES.NOT_FOUND,
      ErrorMessage: ERROR_MESSAGES.NOT_FOUND_PRODUCT_ID(id),
      schema: errorSchema,
    });
  });

  test("Should not update product with existing product name", async ({ productsAPI, productsApiService }) => {
    const product = await productsApiService.create(token);
    const productToUpdate = await productsApiService.create(token);
    const id = productToUpdate._id;
    const name = product.name;
    ids.push(id, product._id);

    const response = await productsAPI.update(id, generateProductData({ name }), token);
    validateResponse(response, {
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.EXISTS_PRODUCT(name),
      schema: errorSchema,
      status: STATUSES_CODES.CONFLICT,
    });
  });

  test("Should update product with max valid data", async ({ productsAPI, productsApiService }) => {
    const product = await productsApiService.create(token);
    ids.push(product._id);
    const productData = {
      name: "Gloves64242aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      amount: 999,
      price: 99999,
      manufacturer: MANUFACTURERS.SONY,
      notes:
        "FugGijgp9M7HnljmfGpmqL2A8WqDnxSv0XdGDImYs8poMqJgkaD7rbqv9HyZzPZtGU6JxKOhvg6OvihDqoCdQ6aGZ3ekUg9aIZJYuKkXoAP4qwKAyK9dNj5LZMUjZw0SekIs3apD77gwMC8HBgJu9u1R2870NuDwp8wPrEWag5aFIEKmTeoP7XLRlLDYI7cEo8feLmvO9b2nvjs2LtE0DYUPhMuMrqHunMhbPdwieMw16CSYWisdw9hlRz",
    };
    const response = await productsAPI.update(product._id, generateProductData(productData), token);
    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
      status: STATUSES_CODES.OK,
    });
    expect(_.omit(response.body.Product, ["_id", "createdOn"])).toEqual(productData);
  });

  test("Should update product with min valid data", async ({ productsAPI, productsApiService }) => {
    const product = await productsApiService.create(token);
    ids.push(product._id);
    const productData = {
      name: "gC1",
      amount: 0,
      price: 1,
      manufacturer: MANUFACTURERS.SONY,
      notes: "",
    };
    const response = await productsAPI.update(product._id, generateProductData(productData), token);
    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
      status: STATUSES_CODES.OK,
    });
    expect(_.omit(response.body.Product, ["_id", "createdOn"])).toEqual(productData);
  });
});
