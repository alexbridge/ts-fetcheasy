import * as assert from 'assert';
import * as fetchMock from 'fetch-mock';
import { HttpHeader } from '../../src/http/http-header';
import { MediaType } from '../../src/http/http-media-type';
import { testClient } from './rest-test-client';

describe('fetcheasy / rest test', () => {
  const entity = { foo: 'bar' };
  const apiEntity = {
    ...entity,
    id: 1,
  };

  afterEach(() => {
    fetchMock.reset();
  });

  it('should add entity', async () => {
    fetchMock.postOnce(
      {
        url: 'http://host/api',
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: apiEntity,
      },
    );

    const response = await testClient.add(entity);

    assert.deepEqual(response, apiEntity);
  });

  it('should get entity', async () => {
    fetchMock.getOnce(
      {
        url: 'http://host/api/1',
        headers: {
          [HttpHeader.ACCEPT]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: apiEntity,
      },
    );

    const response = await testClient.get('1');

    assert.deepEqual(response, apiEntity);
  });

  it('should delete entity', async () => {
    fetchMock.deleteOnce(
      {
        url: 'http://host/api/1',
        headers: {
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
        },
      },
      {
        status: 204,
      },
    );

    const response = await testClient.delete('1');

    assert.ok(response instanceof Response);
    assert.equal(response.status, 204);
  });

  it('should post json with query params, plain text', async () => {
    fetchMock.postOnce(
      {
        url: 'http://host/api/json/10/public?foo=bar',
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
          'x-custom': 'custom-header',
        },
      },
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.TEXT_PLAIN,
        },
        body: 'accepted',
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
      {
        url: 'http://host/api/form/10/public?foo=bar',
        headers: {
          [HttpHeader.AUTHORIZATION]: 'Basic dGVzdDp0ZXN0',
          'x-custom': 'custom-header',
        },
      },
      {
        status: 200,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.TEXT_PLAIN,
        },
        body: 'accepted',
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
