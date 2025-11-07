import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/products/generateProductData";
import { loginSchema } from "data/shemas/login/login.shema";
import { createProductSchema } from "data/shemas/products/create.schema";
import { getProductSchema } from "data/shemas/products/get.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";
  //delete product
  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUSES_CODES.DELETED);
  });
  test("Get Product by id", async ({ request }) => {
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
    const headers = loginResponse.headers();
    token = headers["authorization"];
    expect(token).toBeTruthy();

    //create product
    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const createdProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUSES_CODES.CREATED,
      schema: createProductSchema,
      ErrorMessage: null,
      IsSuccess: true,
    });
    const creatredProduct = createdProductBody.Product;
    id = creatredProduct._id;
    expect(_.omit(creatredProduct, ["_id", "createdOn"])).toEqual(productData);

    const getProductResponse = await request.get(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const getPtoductBody = await getProductResponse.json();
    await validateResponse(getProductResponse, {
      status: STATUSES_CODES.OK,
      schema: getProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(_.omit(getPtoductBody.Product, ["_id", "createdOn"])).toEqual(productData);
  });
});
