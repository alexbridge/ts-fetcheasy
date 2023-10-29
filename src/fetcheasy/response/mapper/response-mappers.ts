import { HttpHeader } from '../../../http/http-header';
import { MediaType } from '../../../http/http-media-type';
import { UnaryAny } from '../../../utils/custom-types';

export type ResponseMapper<T> = (response: Response) => Promise<T>;

export const contentTypeResponseMapper: ResponseMapper<Response | any> = async (
  resp: Response,
): Promise<any> => {
  if (
    resp.headers
      .get(HttpHeader.CONTENT_TYPE)
      ?.startsWith(MediaType.APPLICATION_JSON)
  ) {
    return await resp.json();
  }
  if (resp.headers.get(HttpHeader.CONTENT_TYPE)?.includes('text')) {
    return await resp.text();
  }
  return resp;
};

export const responseDataUnwrap: UnaryAny = ({ data }) => data;
