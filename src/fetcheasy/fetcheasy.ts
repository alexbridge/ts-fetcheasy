import { HttpMethod } from '../http/http';
import {
  ObjectLike,
  ObjectNumberLike,
  ObjectStringsLike,
  UnaryAny,
} from '../utils/custom-types';
import { MiddlewareChain } from '../utils/middleware-chain';

export const FETCHEASY = Symbol('fetcheasy');
export const FETCHEASY_CLIENT = Symbol('fetcheasy-client');

export type FetcheasyClient = {
  baseUrl: string;
  paramsSets?: FetcheasyParamsSet[];
  requestChain: MiddlewareChain<Request, Response>;
};

export type FetcheasyParam = 'path' | 'query' | 'header' | 'form' | 'json';

export type FetcheasyParamMap = ObjectNumberLike;

export type FetcheasyMethodHttpConfig = {
  uri: string;
  method?: HttpMethod;
};

export type FetcheasyResponseMapper = {
  responseMapper?: UnaryAny;
};

export type FetcheasyParamsSetAware = {
  paramsSet?: Symbol;
};

export type FetcheasyMethodConfig = {
  path?: FetcheasyParamMap;
  query?: FetcheasyParamMap;
  header?: FetcheasyParamMap;
  headers?: ObjectStringsLike;
  form?: number;
  json?: number;
} & FetcheasyResponseMapper &
  FetcheasyMethodHttpConfig &
  FetcheasyParamsSetAware;

export type FetcheasyMethods = ObjectLike<FetcheasyMethodConfig>;

export type FetcheasyAware = {
  [FETCHEASY]: FetcheasyMethods;
};

export type FetcheasyParamsSet = {
  key: Symbol;
  query?: Record<string, string>;
  header?: Record<string, string>;
};
