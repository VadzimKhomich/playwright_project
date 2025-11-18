export const obligatoreFieldsSchema = {
  IsSuccess: {
    type: "boolean",
  },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const obligatoryRequiredsFields = ["IsSuccess", "ErrorMessage"];

export const errorSchema = {
  type: "object",
  properties: {
    ...obligatoreFieldsSchema,
    SchemaErrors: {
      type: "object",
    },
  },
  required: [...obligatoryRequiredsFields],
};
