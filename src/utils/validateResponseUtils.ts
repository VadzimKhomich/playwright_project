import { expect } from "@playwright/test";
import { validateJsonShema } from "./shema.utils";
import { IResponse, IResponseFields } from "data/types/api/core.types";

// export async function validateResponse(
//   response: APIResponse,
//   expected: {
//     status: number;
//     schema?: object;
//     IsSuccess?: boolean;
//     ErrorMessage?: string | null;
//   },
// ) {
//   expect.soft(response.status(), `Response status should be ${expected.status}`).toBe(expected.status);
//   const body = await response.json();
//   if (body) {
//     if (expected.schema) validateJsonShema(body, expected.schema!);
//     expect.soft(body.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(expected.IsSuccess);
//     expect.soft(body.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`).toBe(expected.ErrorMessage);
//   }
// }

export function validateResponse<T extends IResponseFields | null>(
  response: IResponse<T>,
  expected: {
    status: number;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
    schema?: object;
  },
) {
  expect.soft(response.status, `Status code should be ${response.status}`).toBe(expected.status);
  if (expected.IsSuccess)
    expect.soft(response.body!.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(expected.IsSuccess);
  if (expected.ErrorMessage)
    expect
      .soft(response.body!.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`)
      .toBe(expected.ErrorMessage);
  if (expected.schema) validateJsonShema(response.body!, expected.schema);
}
