import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/products/generateProductData";
import { loginSchema } from "data/shemas/login/login.shema";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";
  //delete product
  test.afterEach(async ({ productsAPI }) => {
    const response = await productsAPI.delete(id, token);
    expect(response.status).toBe(STATUSES_CODES.DELETED);
  });

  test("Update product", async ({ loginAPI, productsAPI }) => {
    const loginResponse = await loginAPI.login(credentials);
    validateResponse(loginResponse, {
      status: STATUSES_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    token = loginResponse.headers["authorization"];
    expect(token).toBeTruthy();

    //create product
    const productData = generateProductData();
    const createProductResponse = await productsAPI.create(productData, token);
    validateResponse(createProductResponse, {
      status: STATUSES_CODES.CREATED,
      schema: createProductSchema,
      ErrorMessage: null,
      IsSuccess: true,
    });
    const creatredProduct = createProductResponse.body.Product;
    id = creatredProduct._id;
    expect(_.omit(creatredProduct, ["_id", "createdOn"])).toEqual(productData);

    const updatedProductData = generateProductData();

    const updateProductResponse = await productsAPI.update(id, updatedProductData, token);
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
