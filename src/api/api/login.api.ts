import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/api/core.types";
import { ICredentials, ILoginResponse } from "data/types/credentials.types";

export class LoginAPI {
  constructor(private apiClapiClient: IApiClient) {}

  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      baseUrl: apiConfig.baseURL,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
    };
    return await this.apiClapiClient.send<ILoginResponse>(options);
  }
}
