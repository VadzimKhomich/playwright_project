import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/shemas/login/login.shema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { validateResponse } from "utils/validateResponseUtils";
const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
  test("API Login", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    await validateResponse(loginResponse, {
      status: STATUSES_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const token = loginResponse.headers()["authorization"];
    expect.soft(token).toBeTruthy();
  });
});
