import { credentials } from "config/env";
import { test as base, expect } from "fixtures/pages.fixture";

const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, signInPage }, use) => {
    await use(async () => {
      await signInPage.open();
      await signInPage.fillCredentials(credentials);
      await signInPage.clickLogin();
    });
  },
});

export {test, expect}