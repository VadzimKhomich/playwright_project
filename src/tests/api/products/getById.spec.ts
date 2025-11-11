import { test, expect } from "fixtures/api.fixture";
import { getProductSchema } from "data/shemas/products/get.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { validateResponse } from "utils/validateResponseUtils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });
  test("Get Product by id", async ({ loginApiService, productsAPI, productsApiService }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = await productsApiService.create(token);
    id = productData._id;
    //get product by id
    const getProductResponse = await productsAPI.getById(id, token);
    validateResponse(getProductResponse, {
      status: STATUSES_CODES.OK,
      schema: getProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    expect(getProductResponse.body.Product).toEqual(productData);
  });
});
