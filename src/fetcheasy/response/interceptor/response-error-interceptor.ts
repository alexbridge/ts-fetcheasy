import { HttpError } from '../../../http/http';
import { ResponseInterceptor } from './response-interceptor';

export const httpErrorInterceptor: ResponseInterceptor = async (
  response: Response,
): Promise<Response> => {
  if (response.status >= 400) {
    throw new HttpError(
      response.status,
      response.statusText,
      (await response.json()) || (await response.text()),
    );
  }
  return response;
};
