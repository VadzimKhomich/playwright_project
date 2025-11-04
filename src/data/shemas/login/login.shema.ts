import { ROLES } from "data/users/roles";
import { obligatoreFieldsSchema, obligatoryRequiredsFields } from "../core.shema";

export const loginSchema = {
  type: "object",
  properties: {
    ...obligatoreFieldsSchema,
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        username: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        roles: {
          type: "array",
          items: [
            {
              type: "string",
              enum: Object.values(ROLES),
            },
          ],
          minItems: 1,
          maxItems: 1,
        },
        createdOn: {
          type: "string",
        },
      },
      required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
    },
  },
  required: ["User", ...obligatoryRequiredsFields],
};
