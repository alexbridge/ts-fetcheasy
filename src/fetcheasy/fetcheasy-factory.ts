import { ClassLike } from '../utils/custom-types';
import { MiddlewareChain } from '../utils/middleware-chain';
import { FetcheasyRequestHelper } from './fetch/fetch-helper';
import {
  FETCHEASY,
  FetcheasyAware,
  FetcheasyClient,
  FetcheasyMethodConfig,
  FetcheasyMethods,
} from './fetcheasy';
import {
  RequestInterceptor,
  basicAuthRequestInterceptor,
} from './request/request-interceptor';
import { httpErrorInterceptor } from './response/interceptor/response-error-interceptor';
import { ResponseInterceptor } from './response/interceptor/response-interceptor';
import { contentTypeResponseMapper } from './response/mapper/response-mappers';

export class FetcheasyApiFactory {
  public static builder(): FetcheasyApiFactory {
    const builder = new FetcheasyApiFactory();
    builder.responseInterceptor(httpErrorInterceptor);
    return builder;
  }

  private fetcheasyClient: FetcheasyClient = {
    baseUrl: '',
    requestChain: new MiddlewareChain<Request, Response>(
      async (req: Request) => {
        return fetch(req);
      },
    ),
  };

  public baseUrl(baseUrl: string): this {
    this.fetcheasyClient.baseUrl = baseUrl.endsWith('/')
      ? baseUrl.substring(0, baseUrl.length - 1)
      : baseUrl;
    return this;
  }

  public requestInterceptor(interceptor: RequestInterceptor): this {
    this.fetcheasyClient.requestChain.prepend(interceptor);
    return this;
  }

  public responseInterceptor(interceptor: ResponseInterceptor): this {
    this.fetcheasyClient.requestChain.append(interceptor);
    return this;
  }

  public requestChain(requestChain: MiddlewareChain<Request, Response>): this {
    this.fetcheasyClient.requestChain = requestChain;
    return this;
  }

  public basicAuthentication(userName: string, password: string): this {
    this.requestInterceptor(basicAuthRequestInterceptor(userName, password));
    return this;
  }

  public build<T>(apiType: ClassLike<T>): T {
    this.responseInterceptor(contentTypeResponseMapper);

    const instance = new apiType() as FetcheasyAware;

    const fetcheasyClient = this.fetcheasyClient;
    const fetcheasyChain = this.fetcheasyClient.requestChain;
    const fetcheasyMethods = instance[FETCHEASY] as FetcheasyMethods;

    return new Proxy(instance, {
      get: (target: any, prop: any) => {
        if (!target[FETCHEASY][prop]) {
          return target[prop];
        }

        return async (...args: any[]) => {
          const methodConfig = target[FETCHEASY][prop] as FetcheasyMethodConfig;

          const fetchHelper = new FetcheasyRequestHelper(
            fetcheasyClient,
            fetcheasyMethods[prop],
            args,
          );

          const req = new Request(fetchHelper.buildUrl(), {
            method: methodConfig.method,
            headers: fetchHelper.getHeaders(),
            body: fetchHelper.getBody(),
          });

          return fetcheasyChain.request(req).then(async (resp) => {
            if (methodConfig.responseMapper) {
              return await methodConfig.responseMapper(resp);
            }
            return resp;
          });
        };
      },
    });
  }
}
