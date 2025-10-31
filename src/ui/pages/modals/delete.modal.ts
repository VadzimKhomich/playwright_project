import { Modal } from "./modal.page";

export class DeleteModal extends Modal {
  readonly deleteButton = this.page.locator(".modal-footer [type='submit']");

  async clickDeleteButton() {
    await this.deleteButton.click();
  }
}
