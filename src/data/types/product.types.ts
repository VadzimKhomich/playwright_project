import { MANUFACTURERS } from "data/products/manufactures";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export type Actions = "Details" | "Edit" | "Delete";
