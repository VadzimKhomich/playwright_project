import { test, expect } from "fixtures/busibess.fixture";
import { SALES_PORTAL_PRODUCTS_URL } from "config/env";
import { generateProductResponseData } from "data/products/generateProductData";
import _ from "lodash";
import { apiConfig } from "config/apiConfig";
import { SortOrder } from "data/types/api/core.types";
import { ProductsHeaders, ProductsSortField } from "data/types/product.types";
import { convertToDateAndTime } from "utils/date.utils";

const directions = ["asc", "desc"] as SortOrder[];
const headers = ["Name", "Price", "Manufacturer", "Created On"] as ProductsHeaders[];

for (const header of headers) {
  for (const direction of directions) {
    test.describe("[Integration][Sales Portal] [Products] [Table sorting]", async () => {
      test(`Field:${header}, direction:${direction}`, async ({ loginAsAdmin, page, productsPage, mock }) => {
        const headersMapper: Record<string, ProductsSortField> = {
          Name: "name",
          Price: "price",
          Manufacturer: "manufacturer",
          "Created On": "createdOn",
        };
        const product1 = generateProductResponseData();
        await page.waitForTimeout(1000);
        const product2 = generateProductResponseData();
        const products = [product1, product2];

        await mock.productsPage({
          Products: products,
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header],
            sortOrder: directions.find((el) => el !== direction)!,
          },
        });

        await loginAsAdmin();
        await page.goto(SALES_PORTAL_PRODUCTS_URL);
        await productsPage.waitForOpened();
        await mock.productsPage({
          Products: products,
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header],
            sortOrder: direction,
          },
        });
        const request = await productsPage.interceptRequest(
          apiConfig.endpoints.products,
          productsPage.clickTableHeader.bind(productsPage),
          header,
        );

        expect(request.url()).toBe(
          `${apiConfig.baseURL}${apiConfig.endpoints.products}?sortField=${headersMapper[header]}&sortOrder=${direction}&page=1&limit=10`,
        );
        expect(productsPage.tableHeaderArrow(header, { direction })).toBeVisible();
        const tableData = await productsPage.getTableData();
        expect(tableData.length).toBe(products.length);
        tableData.forEach((product, index) => {
          const expected = _.omit(products[index], ["_id", "notes", "amount"]);
          expected.createdOn = convertToDateAndTime(expected.createdOn!);
          expect(product).toEqual(expected);
        });
      });
    });
  }
}
