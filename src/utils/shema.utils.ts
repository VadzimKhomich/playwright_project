import { expect } from "@playwright/test";
import Ajv from "ajv";

export function validateJsonShema(body: object, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(body);

  expect.soft(isValid, "Response body should match JSON Shema").toBe(true);

  if (isValid) {
    console.log("Data is valid according to the shema");
  } else {
    console.log("Data is not valid according to the shema.");
    console.log(validate.errors);
  }
}
