export class IError extends Error {
  status?: number;
}

export interface ResponseError {
  name: string;
  message: string;
  stack?: string;
}
