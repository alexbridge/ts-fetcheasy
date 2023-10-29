import { RequestMiddleware } from '../../../utils/middleware-chain';

export type ResponseInterceptor = RequestMiddleware<Response>;

export const logResponseInterceptor: ResponseInterceptor = async (
  resp: Response,
) => {
  console.log(`Response: ${resp.status} ${resp.statusText}`);
  return resp;
};
