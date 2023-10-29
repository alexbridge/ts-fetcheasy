export type HttpMethod = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchFunction = (
  input: RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly message: string,
    readonly data: ResponseInit,
  ) {
    super(message);
  }
}
