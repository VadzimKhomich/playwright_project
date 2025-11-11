export interface ID {
  _id: string;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface IRequestOptions {
  baseUrl: string;
  url: string;
  method: "post" | "put" | "get" | "delete";
  headers?: Record<string, string>;
  data?: object;
}

export interface IResponse<T extends object | null> {
  status: number;
  headers: Record<string, string>;
  body: T;
}
