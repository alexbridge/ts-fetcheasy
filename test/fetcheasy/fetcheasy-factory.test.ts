import * as assert from 'assert';
import { FETCHEASY } from '../../src/fetcheasy/fetcheasy';
import { HttpHeader } from '../../src/http/http-header';
import { MediaType } from '../../src/http/http-media-type';
import { testClient } from './rest-test-client';

describe('fetcheasy / factory test', () => {
  it('should define fetcheasy config on target', () => {
    const expected = {
      get: {
        path: {
          id: 0,
        },
        uri: '/api/:id',
        method: 'GET',
        headers: {
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
        },
        responseMapper: undefined,
      },
      add: {
        json: 0,
        uri: '/api',
        method: 'POST',
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
        },
        responseMapper: undefined,
      },
      delete: {
        path: {
          id: 0,
        },
        uri: '/api/:id',
        method: 'DELETE',
        headers: {},
        responseMapper: undefined,
      },
      postJson: {
        json: 4,
        query: {
          foo: 3,
        },
        path: {
          scope: 2,
          id: 1,
        },
        header: {
          'x-custom': 0,
        },
        uri: '/api/json/:id/:scope',
        method: 'POST',
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        responseMapper: undefined,
      },
      postForm: {
        form: 4,
        query: {
          foo: 3,
        },
        path: {
          scope: 2,
          id: 1,
        },
        header: {
          'x-custom': 0,
        },
        uri: '/api/form/:id/:scope',
        method: 'POST',
        headers: {},
        responseMapper: undefined,
      },
    };

    // @ts-ignore
    const actual = testClient[FETCHEASY];

    assert.deepEqual(actual, expected);
  });
});
