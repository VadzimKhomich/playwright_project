import { STATUSES_CODES } from "data/statuses/statusCodes";
import { test, expect } from "fixtures/api.fixture";
import { validateResponse } from "utils/validateResponseUtils";

test.describe("[API] [Sales Portal] [Products search]", () => {
  let token = "";
  let id = "";

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Search by name", async ({ productsApiService, productsAPI }) => {
    const product = await productsApiService.create(token);
    id = product._id;
    const response = await productsAPI.getSorted(token, { search: product.name });
    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      status: STATUSES_CODES.OK,
    });
    const { limit, search, manufacturer, total, page, sorting } = response.body;
    const foundProduct = response.body.Products.find((el) => el._id === product._id);
    expect.soft(foundProduct, "Created product should be in response").toBeTruthy();
    expect.soft(limit).toBe(10);
    expect.soft(search).toBe(product.name);
    expect.soft(manufacturer).toEqual([]);
    expect.soft(page).toBe(1);
    expect.soft(sorting).toEqual({
      sortField: "createdOn",
      sortOrder: "desc",
    });
    expect.soft(total).toBeGreaterThanOrEqual(1);
  });

  test("Search by price", async ({ productsApiService, productsAPI }) => {
    const product = await productsApiService.create(token);
    id = product._id;
    const response = await productsAPI.getSorted(token, { search: product.price.toString() });
    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      status: STATUSES_CODES.OK,
    });
    const { limit, search, manufacturer, total, page, sorting } = response.body;
    const foundProduct = response.body.Products.find((el) => el._id === product._id);
    expect.soft(foundProduct, "Created product should be in response").toBeTruthy();
    expect.soft(limit).toBe(10);
    expect.soft(search).toBe(product.price.toString());
    expect.soft(manufacturer).toEqual([]);
    expect.soft(page).toBe(1);
    expect.soft(sorting).toEqual({
      sortField: "createdOn",
      sortOrder: "desc",
    });
    expect.soft(total).toBeGreaterThanOrEqual(1);
  });

  test("Search by price", async ({ productsApiService, productsAPI }) => {
    const product = await productsApiService.create(token);
    id = product._id;
    const response = await productsAPI.getSorted(token, { search: product.manufacturer });
    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      status: STATUSES_CODES.OK,
    });
    const { limit, search, manufacturer, total, page, sorting } = response.body;
    const foundProduct = response.body.Products.find((el) => el._id === product._id);
    expect.soft(foundProduct, "Created product should be in response").toBeTruthy();
    expect.soft(limit).toBe(10);
    expect.soft(search).toBe(product.manufacturer);
    expect.soft(manufacturer).toEqual([]);
    expect.soft(page).toBe(1);
    expect.soft(sorting).toEqual({
      sortField: "createdOn",
      sortOrder: "desc",
    });
    expect.soft(total).toBeGreaterThanOrEqual(1);
  });
});

test.describe("[API] [Sales Portal] [Products sorting]", () => {
  let token = "";
  const ids: string[] = [];
  //delete product
  test.afterEach(async ({ productsApiService }) => {
    if (ids.length) {
      for (const id of ids) {
        await productsApiService.delete(token, id);
      }
      ids.length = 0;
    }
  });
  //login
  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test("SortField: createdOn, SortOrder: asc", async ({ productsApiService, productsAPI, page }) => {
    const product1 = await productsApiService.create(token);
    await page.waitForTimeout(1000);
    const product2 = await productsApiService.create(token);
    ids.push(product1._id, product2._id);

    const response = await productsAPI.getSorted(token, { sortField: "createdOn", sortOrder: "asc", limit: 10 });
    const allProducts = await productsAPI.getAll(token);

    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      status: STATUSES_CODES.OK,
    });

    const actualProducts = response.body.Products;
    const sortded = allProducts.body.Products.toSorted((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateA.getTime() - dateB.getTime();
    }).slice(0, 10);

    actualProducts.forEach((actualProduct, i) => expect.soft(actualProduct).toEqual(sortded[i]));
    const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
    expect.soft(limit).toBe(10);
    expect.soft(search).toBe("");
    expect.soft(manufacturer).toEqual([]);
    expect.soft(pageParam).toBe(1);
    expect.soft(sorting).toEqual({
      sortField: "createdOn",
      sortOrder: "asc",
    });
    expect.soft(total).toBeGreaterThanOrEqual(2);
  });

  test("SortField: manufacturer, SortOrder: desc", async ({ productsApiService, productsAPI, page }) => {
    const product1 = await productsApiService.create(token);
    await page.waitForTimeout(1000);
    const product2 = await productsApiService.create(token);
    ids.push(product1._id, product2._id);

    const response = await productsAPI.getSorted(token, { sortField: "manufacturer", sortOrder: "desc", limit: 10 });
    const allProducts = await productsAPI.getAll(token);

    validateResponse(response, {
      IsSuccess: true,
      ErrorMessage: null,
      status: STATUSES_CODES.OK,
    });

    const actualProducts = response.body.Products;
    console.log(actualProducts);

    const sortded = allProducts.body.Products.toSorted((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return b.manufacturer.localeCompare(a.manufacturer) || dateB.getTime() - dateA.getTime();
    }).slice(0, 10);

    actualProducts.forEach((actualProduct, i) => {
      expect.soft(actualProduct).toEqual(sortded[i]);
    });
    const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
    expect.soft(limit).toBe(10);
    expect.soft(search).toBe("");
    expect.soft(manufacturer).toEqual([]);
    expect.soft(pageParam).toBe(1);
    expect.soft(sorting).toEqual({
      sortField: "manufacturer",
      sortOrder: "desc",
    });
    expect.soft(total).toBeGreaterThanOrEqual(2);
  });
});
