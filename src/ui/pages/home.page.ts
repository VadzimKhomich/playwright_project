import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./sales.portal.page";
import { Metric } from "data/types/home.types";

type HomeModuleButtons = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly uniqElement = this.page.locator(".welcome-text");
  readonly orderMetric = this.page.locator("#total-orders-container p");
  readonly totalRevenueMetric = this.page.locator("#total-revenue-container p");
  readonly newCustomersMetric = this.page.locator("#total-customers-container p");
  readonly avgOrdersValueMetric = this.page.locator("#avg-orders-value-container p");
  readonly canceledOrdersMetric = this.page.locator("#canceled-orders-container p");

  async clickOnViewModule(module: HomeModuleButtons) {
    const moduleButtons: Record<HomeModuleButtons, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };
    await moduleButtons[module].click();
  }

  async getMetricData(metric: Metric) {
    switch (metric) {
      case "orders":
        return this.orderMetric.innerText();
      case "revenue":
        return this.totalRevenueMetric.innerText();
      case "customers":
        return this.newCustomersMetric.innerText();
      case "averageOredrs":
        return this.avgOrdersValueMetric.innerText();
      case "canceledOredrs":
        return this.canceledOrdersMetric.innerText();
    }
  }
}
