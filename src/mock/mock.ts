import { Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { Metric } from "data/types/home.types";
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

  async metrics(metricValue: string, metric: Metric, statusCode: STATUSES_CODES = STATUSES_CODES.OK) {
    this.page.route(apiConfig.baseURL + apiConfig.endpoints.metrics, async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      switch (metric) {
        case "orders":
          body.Metrics.orders.totalOrders = metricValue;
          break;

        case "revenue":
          body.Metrics.orders.totalRevenue = metricValue;
          break;

        case "customers":
          body.Metrics.customers.totalNewCustomers = metricValue;
          break;

        case "averageOredrs":
          body.Metrics.orders.averageOrderValue = metricValue;
          break;
        case "canceledOredrs":
          body.Metrics.orders.totalCanceledOrders = metricValue;
          break;
      }

      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
}
