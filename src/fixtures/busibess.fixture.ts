import { test as base, expect } from "fixtures";

const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, signInPage, loginApiService }, use) => {
    await use(async () => {
      await signInPage.open();
      const token = await loginApiService.loginAsAdmin();
      await page.context().addCookies([
        {
          name: "Authorization",
          value: token,
          domain: "localhost",
          path: "/",
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ]);
      await page.reload();
    });
  },
});

export { expect, test };
