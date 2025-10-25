import { SalesPortalPage } from "../sales.portal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly uniqElement = this.addNewProductButton;
  readonly tableRowByName = (productName: string) =>
    this.page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }
}
