import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage {
  abstract uniqElement: Locator;
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");

  async waitForOpened() {
    await expect(this.uniqElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

  async open() {
    await this.page.goto(SALES_PORTAL_URL);
  }
}