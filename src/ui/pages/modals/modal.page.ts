import { expect } from "@playwright/test";
import { SalesPortalPage } from "../sales.portal.page";

export abstract class Modal extends SalesPortalPage {
  readonly closeButton = this.page.locator(".modal-header .btn-close");
  readonly cancelButton = this.page.locator(".modal-footer .btn-secondary");
  readonly title = this.page.locator(".modal-title");

  async waitForClose() {
    expect(this.uniqElement).not.toBeVisible();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }
}