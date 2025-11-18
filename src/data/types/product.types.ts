import { MANUFACTURERS } from "data/products/manufactures";
import { ID, IResponseFields, SortOrder } from "./api/core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreateProductData {
  title: string;
  product: IProduct;
}

export interface ICreatedOn {
  createdOn: string;
}

export type Actions = "Details" | "Edit" | "Delete";

export interface IProductFromTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export interface IProductSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}
