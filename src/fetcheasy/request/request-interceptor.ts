import { HttpHeader } from '../../http/http-header';
import { RequestMiddleware } from '../../utils/middleware-chain';

export type RequestInterceptor = RequestMiddleware<Request>;

export const basicAuthRequestInterceptor = (
  userName: string,
  password: string,
): RequestInterceptor => {
  const authHeader = `Basic ${Buffer.from(
    `${userName}:${password}`,
    'binary',
  ).toString('base64')}`;

  return async (req: Request): Promise<Request> => {
    req.headers.set(HttpHeader.AUTHORIZATION, authHeader);
    return req;
  };
};

export const logRequestInterceptor: RequestInterceptor = async (
  req: Request,
) => {
  console.log(`Request: ${req.method} ${req.url}`);
  return req;
};
