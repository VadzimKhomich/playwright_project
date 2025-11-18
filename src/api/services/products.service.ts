import { ProductsAPI } from "api/api/products.api";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/shemas/products/create.schema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { IProduct } from "data/types/product.types";
import { validateResponse } from "utils/validateResponseUtils";

export class ProductsApiServices {
  constructor(private productsAPI: ProductsAPI) {}
  async create(token: string, productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    const response = await this.productsAPI.create(data, token);
    validateResponse(response, {
      status: STATUSES_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  async delete(token: string, id: string) {
    const response = await this.productsAPI.delete(id, token);
    validateResponse(response, {
      status: STATUSES_CODES.DELETED,
    });
  }
}
