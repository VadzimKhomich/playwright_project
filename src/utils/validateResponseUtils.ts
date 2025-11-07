import { APIResponse, expect } from "@playwright/test";
import { validateJsonShema } from "./shema.utils";

export async function validateResponse(
  response: APIResponse,
  expected: {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  },
) {
  expect.soft(response.status(), `Response status should be ${expected.status}`).toBe(expected.status);
  const body = await response.json();
  if (body) {
    if (expected.schema) validateJsonShema(body, expected.schema!);
    expect.soft(body.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(expected.IsSuccess);
    expect.soft(body.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`).toBe(expected.ErrorMessage);
  }
}
