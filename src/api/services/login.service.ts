import { expect } from "@playwright/test";
import { LoginAPI } from "api/api/login.api";
import { credentials } from "config/env";
import { STATUSES_CODES } from "data/statuses/statusCodes";
import { ICredentials } from "data/types/credentials.types";
import { validateResponse } from "utils/validateResponseUtils";

export class LoginService {
  constructor(private loginAPI: LoginAPI) {}

  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginAPI.login(customCredentials ?? credentials);
    validateResponse(response, {
      status: STATUSES_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const token = response.headers["authorization"];
    expect(token).toBeTruthy();
    return token;
  }
}
