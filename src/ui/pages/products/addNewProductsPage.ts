import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../sales.portal.page";

export class AddNewProductPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly manufacturerInput = this.page.locator("#inputManufacturer");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly saveButton = this.page.locator("#save-new-product");
  readonly uniqElement = this.title;

  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerInput.selectOption(productData.manufacturer);
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async clickSave() {
    this.saveButton.click();
  }
}
