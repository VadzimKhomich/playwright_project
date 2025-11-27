import { test, expect } from "fixtures/busibess.fixture";
import { SALES_PORTAL_PRODUCTS_URL } from "config/env";
import { generateProductResponseData } from "data/products/generateProductData";
import _ from "lodash";
import { convertToFullDateAndTime } from "utils/date.utils";

test.describe("[Integration][Sales Portal] [Products]", async () => {
  test("Product Details", async ({ loginAsAdmin, page, productsPage, mock }) => {
    const expectedProductResponse = generateProductResponseData();
    await mock.productDetailsModal({ Product: expectedProductResponse, IsSuccess: true, ErrorMessage: null });
    await mock.productsPage({
      Products: [expectedProductResponse],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "desc",
      },
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_PRODUCTS_URL);
    await productsPage.waitForOpened();
    await productsPage.clickOnActionButton(expectedProductResponse.name, "Details");
    const { detailsModal } = productsPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getProductFromDetails();
    expect(actual).toEqual({
      ..._.omit(expectedProductResponse, ["_id"]),
      createdOn: convertToFullDateAndTime(expectedProductResponse.createdOn),
    });
  });
});
