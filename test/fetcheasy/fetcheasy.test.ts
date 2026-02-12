import * as assert from 'assert';
import fetchMock from 'fetch-mock';
import { HttpHeader } from '../../src/http/http-header';
import { MediaType } from '../../src/http/http-media-type';
import { testClient } from './rest-test-client';

describe('fetcheasy / rest test', () => {
  const entity = { foo: 'bar' };
  const apiEntity = {
    ...entity,
    id: 1,
  };

  beforeEach(() => {
    fetchMock.mockGlobal();
  });

  afterEach(() => {
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    fetchMock.unmockGlobal();
  });

  it('should add entity', async () => {
    fetchMock.postOnce(
      'http://host/api',
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: apiEntity,
      },
      {
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
    );

    const response = await testClient.add(entity);

    assert.deepEqual(response, apiEntity);
  });

  it('should get entity', async () => {
    fetchMock.getOnce(
      'http://host/api/1?key=api-key',
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: apiEntity,
      },
      {
        headers: {
          'X-Version': '2.0',
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
    );

    const response = await testClient.get('1');

    assert.deepEqual(response, apiEntity);
  });

  it('should delete entity', async () => {
    fetchMock.deleteOnce(
      'http://host/api/1',
      {
        status: 204,
      },
      {
        headers: {
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
    );

    const response = await testClient.delete('1');

    assert.ok(response instanceof Response);
    assert.equal(response.status, 204);
  });

  it('should post json with query params, plain text', async () => {
    fetchMock.postOnce(
      'http://host/api/json/10/public?foo=bar',
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.TEXT_PLAIN,
        },
        body: 'accepted',
      },
      {
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
          'x-custom': 'custom-header',
        },
      },
    );

    const response = await testClient.postJson(
      'custom-header',
      '10',
      'public',
      'bar',
      entity,
    );

    assert.equal(response, 'accepted');
  });

  it('should post form with query params, plain text', async () => {
    fetchMock.postOnce(
      'http://host/api/form/10/public?foo=bar',
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.TEXT_PLAIN,
        },
        body: 'accepted',
      },
      {
        headers: {
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
          'x-custom': 'custom-header',
        },
      },
    );

    const formData = new FormData();
    formData.set('foo', 'bar');

    const response = await testClient.postForm(
      'custom-header',
      '10',
      'public',
      'bar',
      formData,
    );
    assert.equal(response, 'accepted');
  });
});
