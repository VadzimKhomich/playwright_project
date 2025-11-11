import { test, expect } from "fixtures/api.fixture";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { IProductFromResponse } from "data/types/product.types";

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ productsAPI, loginApiService, productsApiService }) => {
    const token = await loginApiService.loginAsAdmin();
    const productData = await productsApiService.create(token);
    const id = productData._id;
    const response = await productsAPI.delete(id, token);
    expect(response.status).toBe(STATUSES_CODES.DELETED);
  });

  test.skip("Delete all products", async ({ productsAPI, loginApiService }) => {
    const token = await loginApiService.loginAsAdmin();
    const productsAllResponse = await productsAPI.getAll(token);
    const ids = productsAllResponse.body.Products.map((product: IProductFromResponse) => product._id);
    for (const id of ids) {
      const response = await productsAPI.delete(id, token);
      expect.soft(response.status).toBe(STATUSES_CODES.DELETED);
    }
  });
});
