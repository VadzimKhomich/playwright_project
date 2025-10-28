import { Actions } from "data/types/product.types";
import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../sales.portal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly uniqElement = this.addNewProductButton;
  readonly tableRowByName = (productName: string) =>
    this.page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickOnActionButton(productName: string, action: Actions) {
    const actionsButtons: Record<Actions, Locator> = {
      Details: this.detailsButton(productName),
      Edit: this.editButton(productName),
      Delete: this.deleteButton(productName),
    };
    await actionsButtons[action].click();
  }
  async getProductDataFromTable(productName: string) {
    const [name, price, manufacturer] = await this.tableRowByName(productName).locator("td").allTextContents();
    return {
      name,
      price: +price.replaceAll("$", ""),
      manufacturer,
    };
  }
}
