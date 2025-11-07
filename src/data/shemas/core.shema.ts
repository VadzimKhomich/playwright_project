export const obligatoreFieldsSchema = {
  IsSuccess: {
    type: "boolean",
  },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const obligatoryRequiredsFields = ["IsSuccess", "ErrorMessage"];
