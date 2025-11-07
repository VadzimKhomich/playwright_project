import { MANUFACTURERS } from "data/products/manufactures";
import { obligatoreFieldsSchema, obligatoryRequiredsFields } from "../core.shema";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        amount: {
          type: "integer",
        },
        price: {
          type: "integer",
        },
        manufacturer: {
          type: "string",
          enum: Object.values(MANUFACTURERS),
        },
        createdOn: {
          type: "string",
        },
        notes: {
          type: "string",
        },
        _id: {
          type: "string",
        },
      },
      required: ["name", "amount", "price", "manufacturer", "createdOn", "_id"],
    },
    ...obligatoreFieldsSchema,
  },
  required: ["Product", ...obligatoryRequiredsFields],
};
