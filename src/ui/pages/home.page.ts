import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./sales.portal.page";

type HomeModuleButtons = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly uniqElement = this.page.locator(".welcome-text");

  async clickOnViewModule(module: HomeModuleButtons) {
    const moduleButtons: Record<HomeModuleButtons, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };
    await moduleButtons[module].click();
  }
}
