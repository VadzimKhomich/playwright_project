import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/products/generateProductData";
import { loginSchema } from "data/shemas/login/login.shema";
import { allProductsSchema } from "data/shemas/products/allProducts.schema";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";

  test.afterEach(async ({ productsAPI }) => {
    const response = await productsAPI.delete(id, token);
    expect(response.status).toBe(STATUSES_CODES.DELETED);
  });

  test("Get all products smoke", async ({ productsAPI, loginAPI }) => {
    //login
    const loginResponse = await loginAPI.login(credentials);
    validateResponse(loginResponse, {
      status: STATUSES_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    token = loginResponse.headers["authorization"];
    expect.soft(token).toBeTruthy();
    //create product
    const productData = generateProductData();
    const createProductResponse = await productsAPI.create(productData, token);
    validateResponse(createProductResponse, {
      status: STATUSES_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    id = createProductResponse.body.Product._id;

    //get all products
    const allProductsResponse = await productsAPI.getAll(token);
    validateResponse(allProductsResponse, {
      status: STATUSES_CODES.OK,
      schema: allProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const allProducts = allProductsResponse.body.Products;
    expect(_.some(allProducts, _.omit(productData, ["createdOn", "_id"]))).toBe(true);
  });
});
