import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/products/generateProductData";
import { loginSchema } from "data/shemas/login/login.shema";
import { allProductsSchema } from "data/shemas/products/allProducts.schema";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";
const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";

  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUSES_CODES.DELETED);
  });

  test("Get all products smoke", async ({ request }) => {
    //login
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    await validateResponse(loginResponse, {
      status: STATUSES_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    token = loginResponse.headers()["authorization"];
    expect.soft(token).toBeTruthy();
    //create product
    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    await validateResponse(createProductResponse, {
      status: STATUSES_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const createProductBody = await createProductResponse.json();
    id = createProductBody.Product._id;

    //get all products
    const allProductsResponse = await request.get(baseURL + endpoints.productsAll, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    await validateResponse(allProductsResponse, {
      status: STATUSES_CODES.OK,
      schema: allProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const allProductsBody = await allProductsResponse.json();
    const allProducts = allProductsBody.Products;
    expect(_.some(allProducts, _.omit(productData, ["createdOn", "_id"]))).toBe(true);
  });
});
