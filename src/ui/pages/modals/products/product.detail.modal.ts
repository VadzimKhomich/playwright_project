import { Modal } from "../modal.page";

export class ProductDetailModal extends Modal {
  readonly uniqElement = this.page.locator("#details-modal-container");
  readonly valueFromFromDetails = (parametrName: string) =>
    this.uniqElement.locator(`//h6[.//strong[contains(normalize-space(.), "${parametrName}")]]/following-sibling::p`);

  async getProductFromDetails() {
    return {
      name: await this.valueFromFromDetails("Name").textContent(),
      amount: Number(await this.valueFromFromDetails("Amount").textContent()),
      price: Number(await this.valueFromFromDetails("Price").textContent()),
      manufacturer: await this.valueFromFromDetails("Manufacturer").textContent(),
      notes: await this.valueFromFromDetails("Notes").textContent(),
    };
  }
}