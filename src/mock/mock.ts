import { Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { IProductResponse, IProductSortedResponse } from "data/types/product.types";

export class Mock {
  constructor(private page: Page) {}

  async productsPage(body: IProductSortedResponse, statusCode: STATUSES_CODES = STATUSES_CODES.OK) {
    this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  async productDetailsModal(body: IProductResponse, statusCode: STATUSES_CODES = STATUSES_CODES.OK) {
    this.page.route(apiConfig.baseURL + apiConfig.endpoints.productById(body.Product._id), async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
}
