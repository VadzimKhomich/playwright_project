import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";
import { MANUFACTURERS } from "./manufactures";
import { getRandomEnumValue } from "utils/enum.utils";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 10000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 1, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}
