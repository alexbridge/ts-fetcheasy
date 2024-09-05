import {
  FetcheasyClient,
  FetcheasyMethodConfig,
  FetcheasyParamsSet,
} from '../fetcheasy';

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
    let initialHeaders = {};

    if (this.methodConfig.paramsSet) {
      ({ header: initialHeaders = {} } = this.findParamsSet(
        this.methodConfig.paramsSet,
      ));
    }

    const headers = new Headers({
      ...initialHeaders,
      ...this.methodConfig.headers,
    });

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
    const searchParams = new URLSearchParams();
    const methodQuery = this.methodConfig.query;

    if (this.methodConfig.paramsSet) {
      const { query = {} } = this.findParamsSet(this.methodConfig.paramsSet);
      Object.keys(query).forEach((key) => {
        searchParams.set(key, query[key] ?? '');
      });
    }

    if (methodQuery) {
      Object.keys(methodQuery).forEach((key) => {
        searchParams.set(key, this.args[methodQuery[key]] ?? '');
      });
    }

    if (searchParams.size) {
      return `?${searchParams}`;
    }
    return '';
  }

  private hasArg(index: number): boolean {
    return index >= 0 && index < this.args.length;
  }

  private findParamsSet(key: Symbol): FetcheasyParamsSet {
    return (
      this.apiClient.paramsSets?.find((set) => set.key === key) || {
        key,
        query: {},
        header: {},
      }
    );
  }
}
