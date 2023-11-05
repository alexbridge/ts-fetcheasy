import * as assert from 'assert';
import { FetcheasyRequestHelper } from '../../../src/fetcheasy/fetch/fetch-helper';
import {
  FetcheasyClient,
  FetcheasyMethodConfig,
} from '../../../src/fetcheasy/fetcheasy';
import { MiddlewareChain } from '../../../src/utils/middleware-chain';

describe('fetcheasy / fetch / fetch-helper', () => {
  const client: FetcheasyClient = {
    baseUrl: 'http://host',
    requestChain: new MiddlewareChain(() => Promise.resolve(new Response())),
  };
  const methodConfig: FetcheasyMethodConfig = {
    uri: '/books/:id/author/:author',
    headers: {
      'x-method': 'method',
    },
    header: {
      'x-param': 4,
    },
    path: {
      id: 0,
      author: 1,
    },
    query: {
      public: 2,
    },
    json: 3,
  };

  describe('fetcheasy / fetch / fetch-helper / buildUrl', () => {
    it('build path and query', () => {
      const fetchHelper = new FetcheasyRequestHelper(client, methodConfig, [
        1,
        2,
        'true',
      ]);
      assert.equal(
        fetchHelper.buildUrl(),
        'http://host/books/1/author/2?public=true',
      );
    });
  });

  describe('fetcheasy / fetch / fetch-helper / getBody', () => {
    it('get json body', () => {
      const fetchHelper = new FetcheasyRequestHelper(client, methodConfig, [
        1,
        2,
        'true',
        { foo: 'bar' },
      ]);
      assert.equal(fetchHelper.getBody(), '{"foo":"bar"}');
    });
  });

  describe('fetcheasy / fetch / fetch-helper / getHeaders', () => {
    it('get mixed headers', () => {
      const fetchHelper = new FetcheasyRequestHelper(client, methodConfig, [
        1,
        2,
        'true',
        { foo: 'bar' },
        'x-header',
      ]);
      assert.deepEqual(
        fetchHelper.getHeaders(),
        new Headers({
          'x-method': 'method',
          'x-param': 'x-header',
        }),
      );
    });
  });
});
