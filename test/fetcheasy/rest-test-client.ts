import {
  Delete,
  Get,
  Post,
} from '../../src/fetcheasy/decorators/method-decorators';
import {
  Form,
  HeaderParam,
  Json,
  PathParam,
  QueryParam,
} from '../../src/fetcheasy/decorators/param-decorators';
import { FetcheasyApiFactory } from '../../src/fetcheasy/fetcheasy-factory';
import { MediaType } from '../../src/http/http-media-type';

export class RestTestClient {
  @Get({ path: '/api/:id', consumes: MediaType.APPLICATION_JSON })
  async get(@PathParam('id') id: string): Promise<string> {
    return undefined as any;
  }

  @Post({
    path: '/api',
    consumes: MediaType.APPLICATION_JSON,
  })
  async add(@Json() jsonData: object): Promise<object> {
    return undefined as any;
  }

  @Delete('/api/:id')
  async delete(@PathParam('id') id: string): Promise<Response> {
    return undefined as any;
  }

  @Post('/api/json/:id/:scope')
  async postJson(
    @HeaderParam('x-custom') customHeader: string,
    @PathParam('id') id: string,
    @PathParam('scope') scope: string,
    @QueryParam('foo') foo: string,
    @Json() jsonData: object,
  ): Promise<string> {
    return undefined as any;
  }

  @Post('/api/form/:id/:scope')
  async postForm(
    @HeaderParam('x-custom') customHeader: string,
    @PathParam('id') id: string,
    @PathParam('scope') scope: string,
    @QueryParam('foo') foo: string,
    @Form() form: FormData,
  ): Promise<string> {
    return undefined as any;
  }
}

export const testClient = FetcheasyApiFactory.builder()
  .baseUrl('http://host')
  //.requestChain(new MiddlewareChain<Request, Response>(fetchMock.sandbox()))
  .basicAuthentication('test', 'test')
  .build(RestTestClient);
