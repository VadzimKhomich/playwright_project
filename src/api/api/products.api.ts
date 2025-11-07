import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/api/core.types";
import { IProduct, IProductResponse, IProductsResponse } from "data/types/product.types";

export class ProductsAPI {
  constructor(private apiClient: IApiClient) {}

  async create(product: IProduct, token: string) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.products,
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: product,
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  async update(id: string, product: IProduct, token: string) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(id),
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: product,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  async getAll(token: string) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.productsAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<IProductsResponse>(options);
  }

  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<null>(options);
  }
}
