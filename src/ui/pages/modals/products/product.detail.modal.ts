import { IProductDetails } from "data/types/product.types";
import { Modal } from "../modal.page";
import { MANUFACTURERS } from "data/products/manufactures";

export class ProductDetailModal extends Modal {
  readonly uniqElement = this.page.locator("#details-modal-container");
  readonly productValues = this.uniqElement.locator("p");
  readonly editProductButton = this.uniqElement.locator(".modal-footer .btn-primary");

  async getProductFromDetails(): Promise<IProductDetails> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.productValues.allInnerTexts();
    return {
      name,
      amount: +amount,
      price: +price,
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn,
      notes: notes === "-" ? "" : notes,
    };
  }
}
