import { HttpMethod } from '../../http/http';
import { HttpHeader } from '../../http/http-header';
import { MediaType } from '../../http/http-media-type';
import { ObjectStringsLike, UnaryAny } from '../../utils/custom-types';
import { FETCHEASY, FetcheasyMethods } from '../fetcheasy';

export type ApiMethodExpandedOptions = {
  path: string;
  method?: HttpMethod;
  consumes?: MediaType;
  produces?: MediaType;
  headers?: ObjectStringsLike;
  responseMapper?: UnaryAny;
};

export type ApiMethodOptions = string | ApiMethodExpandedOptions;

export function methodOptions(
  options: ApiMethodExpandedOptions,
): MethodDecorator {
  return function (target: any, key: any): void {
    const fetcheasy = target[FETCHEASY] as FetcheasyMethods;

    target[FETCHEASY] = {
      ...fetcheasy,
      [key!]: {
        ...fetcheasy?.[key],
        uri: options.path,
        method: options.method,
        responseMapper: options.responseMapper,
        headers: {
          ...fetcheasy?.[key]?.headers,
          ...options?.headers,
        },
      },
    } as FetcheasyMethods;
  };
}

function ApiMethod(
  method: HttpMethod,
  options: ApiMethodOptions,
): MethodDecorator {
  if (typeof options === 'string') {
    options = {
      path: options,
    };
  }

  options.path = options.path.startsWith('/')
    ? options.path
    : '/' + options.path;

  return methodOptions({
    method,
    ...options,
    headers: {
      ...options.headers,
      ...(options.produces && { [HttpHeader.CONTENT_TYPE]: options.produces }),
      ...(options.consumes && { [HttpHeader.ACCEPT]: options.consumes }),
    },
  });
}

export function Get(options: ApiMethodOptions): MethodDecorator {
  return ApiMethod('GET', options);
}

export function Post(options: ApiMethodOptions): MethodDecorator {
  return ApiMethod('POST', options);
}

export function Put(options: ApiMethodOptions): MethodDecorator {
  return ApiMethod('PUT', options);
}

export function Delete(options: ApiMethodOptions): MethodDecorator {
  return ApiMethod('DELETE', options);
}
