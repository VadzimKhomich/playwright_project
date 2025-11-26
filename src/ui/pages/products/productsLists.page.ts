import { Actions, IProductFromTable, ProductsHeaders } from "data/types/product.types";
import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../sales.portal.page";
import { MANUFACTURERS } from "data/products/manufactures";
import { ProductDetailModal } from "../modals/products/product.detail.modal";
import { DeleteModal } from "../modals/delete.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailModal(this.page);
  readonly deleteModal = new DeleteModal(this.page);
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly uniqElement = this.addNewProductButton;
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableHeader = this.page.locator("thead tr div[current]");
  readonly tableHeaderArrow = (name: ProductsHeaders, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);
  readonly tableheaderNamed = (headerName: ProductsHeaders) => this.tableHeader.filter({ hasText: headerName });
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
  async getProductDataFromTable(productName: string): Promise<IProductFromTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName)
      .locator("td")
      .allTextContents();
    return {
      name,
      price: +price.replaceAll("$", ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn,
    };
  }

  async getTableData() {
    const data: IProductFromTable[] = [];
    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allTextContents();
      data.push({
        name,
        price: +price.replaceAll("$", ""),
        manufacturer: manufacturer as MANUFACTURERS,
        createdOn,
      });
    }
    return data;
  }

  async clickTableHeader(headerName: ProductsHeaders) {
    await this.tableheaderNamed(headerName).click();
  }
}
