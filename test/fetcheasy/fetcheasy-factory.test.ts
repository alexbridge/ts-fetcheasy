import * as assert from 'assert';
import { FETCHEASY } from '../../src/fetcheasy/fetcheasy';
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
        headers: {},
        responseMapper: undefined,
      },
      add: {
        json: 0,
        uri: '/api',
        method: 'POST',
        headers: {},
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
          'X-Custom': 0,
        },
        uri: '/api/json/:id/:scope',
        method: 'POST',
        headers: {},
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
          'X-Custom': 0,
        },
        uri: '/api/form/:id/:scope',
        method: 'POST',
        headers: {},
        responseMapper: undefined,
      },
    };

    const actual = testClient[FETCHEASY];

    assert.deepEqual(actual, expected);
  });
});
