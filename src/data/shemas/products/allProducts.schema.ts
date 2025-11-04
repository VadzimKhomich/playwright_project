import { MANUFACTURERS } from "data/products/manufactures";
import { obligatoreFieldsSchema, obligatoryRequiredsFields } from "../core.shema";

export const allProductsSchema = {
  type: "object",
  properties: {
    Products: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
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
          },
          required: ["_id", "name", "amount", "price", "manufacturer", "createdOn", "notes"],
        },
      ],
    },
    ...obligatoreFieldsSchema,
  },
  required: ["Products", ...obligatoryRequiredsFields],
};
