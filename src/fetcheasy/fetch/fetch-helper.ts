import { FetcheasyClient, FetcheasyMethodConfig } from '../fetcheasy';

export class FetcheasyRequestHelper {
  constructor(
    readonly apiClient: FetcheasyClient,
    readonly methodConfig: FetcheasyMethodConfig,
    readonly args: any[],
  ) {}

  getBody(): BodyInit | null {
    const jsonArg = this.methodConfig.json ?? null;
    if (jsonArg !== null && this.hasArg(jsonArg)) {
      return JSON.stringify(this.args[jsonArg]);
    }

    const formArg = this.methodConfig.form ?? null;
    if (formArg !== null && this.hasArg(formArg)) {
      return this.args[formArg];
    }

    return null;
  }

  getHeaders(): Headers {
    const headers = new Headers(this.methodConfig.headers);

    const headerParams = this.methodConfig.header;
    if (headerParams) {
      Object.keys(headerParams).forEach((key) => {
        const headerValue = headerParams[key];
        if (typeof headerValue === 'number' && this.hasArg(headerValue)) {
          headers.set(key, this.args[headerParams[key]]);
        }
      });
    }

    return headers;
  }

  buildUrl(): string {
    const baseUrl = this.apiClient.baseUrl;
    const path = this.pathString();
    const queryString = this.queryString();

    return `${baseUrl}${path}${queryString}`;
  }

  private pathString(): string {
    let uri = this.methodConfig.uri;
    const methodPathParams = this.methodConfig.path;
    if (methodPathParams) {
      uri = Object.keys(methodPathParams).reduce((path, key) => {
        const pathValue = this.args[methodPathParams[key]];

        return path.replace(`:${key}`, pathValue);
      }, uri);
    }
    return uri;
  }

  private queryString() {
    let queryParams = '';
    const methodQuery = this.methodConfig.query;
    if (methodQuery) {
      const searchParams = new URLSearchParams();

      Object.keys(methodQuery).forEach((key) => {
        searchParams.set(key, this.args[methodQuery[key]]);
      });

      if (searchParams.size) {
        queryParams = `?${searchParams}`;
      }
    }
    return queryParams;
  }

  private hasArg(index: number): boolean {
    return index >= 0 && index < this.args.length;
  }
}
