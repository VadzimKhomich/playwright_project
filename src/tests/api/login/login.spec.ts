import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { loginSchema } from "data/shemas/login/login.shema";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { validateResponse } from "utils/validateResponseUtils";

test.describe("[API] [Sales Portal] [Login]", () => {
  test("API Login", async ({ loginAPI }) => {
    const loginResponse = await loginAPI.login(credentials);
    validateResponse(loginResponse, {
      status: STATUSES_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const token = loginResponse.headers["authorization"];
    expect.soft(token).toBeTruthy();
  });
});
