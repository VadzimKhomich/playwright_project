import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/products/generateProductData";
import { loginSchema } from "data/shemas/login/login.shema";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { IProductFromResponse } from "data/types/product.types";
import _ from "lodash";
import { validateResponse } from "utils/validateResponseUtils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ request }) => {
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
    const token = headers["authorization"];
    //create product
    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUSES_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const actualProductData = createProductBody.Product as IProductFromResponse;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    const id = actualProductData._id;
    //delete
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUSES_CODES.DELETED);
  });

  test.skip("Delete all products", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const headers = loginResponse.headers();
    const token = headers["authorization"];

    const productsAllResponse = await request.get(baseURL + endpoints.productsAll, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await productsAllResponse.json();
    const ids = body.Products.map((product: IProductFromResponse) => product._id);

    for (const id of ids) {
      const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect.soft(response.status()).toBe(STATUSES_CODES.DELETED);
    }
  });
});
