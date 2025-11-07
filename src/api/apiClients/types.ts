import { IRequestOptions, IResponse } from "data/types/api/core.types";

export interface IApiClient {
  send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;
}
