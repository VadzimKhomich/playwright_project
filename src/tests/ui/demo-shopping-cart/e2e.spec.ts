import test, { expect, Page } from "@playwright/test";

interface ICartData {
  name: string;
  price: number;
  amount: number;
}

interface IPromocode {
  name: string;
  rebate: number;
}
const promocodes: IPromocode[] = [
  { name: "10-PERCENT-FOR-REDEEM", rebate: 10 },
  { name: "NO-PYTHON", rebate: 8 },
  { name: "JAVA-FOR-BOOMERS", rebate: 7 },
  { name: "5-PERCENT-FOR-UTILS", rebate: 5 },
  { name: "HOT-COURSE", rebate: 10 },
  { name: "15-PERCENT-FOR-CSS", rebate: 15 },
  { name: "HelloThere", rebate: 20 },
];

const desiredProducts: ICartData[] = [
  {
    name: "Product 2",
    price: 200,
    amount: 1,
  },
  {
    name: "Product 4",
    price: 750,
    amount: 1,
  },
  {
    name: "Product 6",
    price: 1200,
    amount: 1,
  },
  {
    name: "Product 8",
    price: 1500,
    amount: 1,
  },
  {
    name: "Product 10",
    price: 2000,
    amount: 1,
  },
];

test.describe("[Demo shipping cart]", () => {
  test("E2E", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    const desiredProductsNames = desiredProducts.map(({ name }) => name);
    const bage = page.locator("#badge-number");
    const shoppingCart = page.locator("#shopping-cart-btn");
    const checkoutTitle = page.locator("span.text-primary");
    const totalPriceLabel = page.locator("#total-price");
    const continueToCheckOutButton = page.locator("#continue-to-checkout-button");
    const titleCheckoit = page.locator("h4 span.text-primary");
    const finalCheckoutBage = page.locator("h4 span.badge");
    const totalOnCheckout = page.locator("span.text-muted");

    await addProducts(page, desiredProductsNames);
    await expect(bage, `Should have ${desiredProductsNames.length} in bage`).toHaveText(
      desiredProductsNames.length.toString(),
    );
    await shoppingCart.click();
    await expect(checkoutTitle).toBeVisible();
    const expectedTotalPrice = desiredProducts.reduce((total, { price }) => (total += price), 0);
    await expect(totalPriceLabel, `Should have ${expectedTotalPrice} in total price`).toHaveText(
      `$${expectedTotalPrice.toFixed(2)}`,
    );
    const actualProductsInCheckout = await getCardsData(page, desiredProductsNames);
    desiredProducts.forEach((product, index) => expect(actualProductsInCheckout[index]).toEqual(product));
    await applyPromocodes(page, promocodes);
    const appliedPromocodes = await getAppliedPromocodes(page);
    appliedPromocodes.forEach((code, index) => expect(code).toEqual(promocodes[index]));
    const fullRebate = appliedPromocodes.reduce((sum, { rebate }) => sum + rebate, 0) / 100;
    const totalWithPromocodes = expectedTotalPrice * (1 - fullRebate);
    const rebateValue = expectedTotalPrice * fullRebate;
    await expect(totalPriceLabel).toHaveText(`$${totalWithPromocodes.toFixed(2)} (-$${rebateValue.toFixed(1)})`);
    await continueToCheckOutButton.click();
    await expect(totalOnCheckout).toHaveText(`$${totalWithPromocodes.toFixed(2)}`);
    await expect(titleCheckoit).toHaveText("Checkout");
    await expect(finalCheckoutBage).toHaveText(desiredProducts.length.toString());
  });
});

function addProductButton(page: Page, productName: string) {
  return page
    .locator(".card-body")
    .filter({ has: page.locator(".card-title", { hasText: productName }) })
    .getByRole("button", { name: "Add to card" });
}

async function addProducts(page: Page, productsNames: string[]) {
  for (const product of productsNames) {
    const button = addProductButton(page, product);
    await button.click();
  }
}

function productCardByName(page: Page, productName: string) {
  return page.locator("ul li > div[data-product-id]").filter({ has: page.locator("h5", { hasText: productName }) });
}

async function getProductCartDataInCheckout(page: Page, productName: string): Promise<ICartData> {
  const card = productCardByName(page, productName);
  const titleLabel = card.locator("h5");
  const priceLabel = card.locator("span.text-muted");
  const amountLable = card.locator("span[data-id='product-amount-in-shopping-cart']");

  const [name, price, amount] = await Promise.all([titleLabel, priceLabel, amountLable].map((el) => el.innerText()));
  return {
    name,
    price: +price?.replace("$", ""),
    amount: +amount,
  };
}

async function getCardsData(page: Page, productsNames: string[]): Promise<ICartData[]> {
  return await Promise.all(productsNames.map((name) => getProductCartDataInCheckout(page, name)));
}

async function waitForSpinner(page: Page) {
  const spinner = page.locator(".spinner-border");
  await expect(spinner).not.toBeVisible();
}

async function enterPromocode(page: Page, code: string): Promise<void> {
  const promocodeInput = page.locator("#rebate-input");
  const reedemButton = page.locator("#apply-promocode-button");
  await promocodeInput.fill(code);
  await reedemButton.click();
  await waitForSpinner(page);
}

async function applyPromocodes(page: Page, codes: IPromocode[]) {
  for (const code of codes) {
    await enterPromocode(page, code.name);
  }
}

async function getAppliedPromocodes(page: Page): Promise<IPromocode[]> {
  const promocodesContainer = await page.locator("#rebates-list li").all();
  const results = [];
  for (const container of promocodesContainer) {
    const nameLocator = container.locator("span");
    const rebateLocator = container.locator("small");
    const [name, rebate] = await Promise.all([nameLocator, rebateLocator].map((el) => el.innerText()));
    results.push({
      name,
      rebate: +rebate.replace(/[-%]/gi, ""),
    });
  }
  return results;
}
