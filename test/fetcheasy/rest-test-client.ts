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
import { FetcheasyAware } from '../../src/fetcheasy/fetcheasy';
import { FetcheasyApiFactory } from '../../src/fetcheasy/fetcheasy-factory';

export class RestTestClient {
  @Get('/api/:id')
  async get(@PathParam('id') id: string): Promise<string> {
    return undefined as any;
  }

  @Post({ path: '/api' })
  async add(@Json() jsonData: object): Promise<void> {}

  @Delete('/api/:id')
  async delete(@PathParam('id') id: string): Promise<void> {}

  @Post({ path: '/api/json/:id/:scope' })
  async postJson(
    @HeaderParam('X-Custom') customHeader: string,
    @PathParam('id') id: string,
    @PathParam('scope') scope: string,
    @QueryParam('foo') foo: string,
    @Json() jsonData: object,
  ): Promise<string> {
    return undefined as any;
  }

  @Post({ path: '/api/form/:id/:scope' })
  async postForm(
    @HeaderParam('X-Custom') customHeader: string,
    @PathParam('id') id: string,
    @PathParam('scope') scope: string,
    @QueryParam('foo') foo: string,
    @Form() form: object,
  ): Promise<string> {
    return undefined as any;
  }
}

export const testClient: FetcheasyAware = FetcheasyApiFactory.builder()
  .baseUrl('http://host')
  .build(RestTestClient);
