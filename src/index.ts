import { Delete, Post } from './fetcheasy/decorators/method-decorators';
import {
  Form,
  HeaderParam,
  Json,
  PathParam,
  QueryParam,
} from './fetcheasy/decorators/param-decorators';
import { FetcheasyApiFactory } from './fetcheasy/fetcheasy-factory';
import { logRequestInterceptor } from './fetcheasy/request/request-interceptor';
import { logResponseInterceptor } from './fetcheasy/response/interceptor/response-interceptor';
import { MiddlewareChain } from './utils/middleware-chain';

class MyClass {
  @Post({ path: '/api/path' })
  async greet(
    @HeaderParam('X-Custom') customHeader: string,
    @PathParam('id') id: string,
    @PathParam('scope') scope: string,
    @QueryParam('foo') foo: string,
    @Json() jsonData: object,
    @Form() formData: FormData,
    // @ts-ignore
  ): Promise<string> {}

  @Delete('/api/path/:id')
  async delete(@PathParam('id') id: string): Promise<void> {}
}

const myClassApi = FetcheasyApiFactory.builder()
  .baseUrl('http://host')
  .requestChain(
    new MiddlewareChain<Request, Response>(async (req: Request) =>
      Promise.resolve(new Response()),
    ),
  )
  .requestInterceptor(logRequestInterceptor)
  .responseInterceptor(logResponseInterceptor)
  .build(MyClass);

setInterval(() => {
  myClassApi
    .greet('1', '1', 'foo', 'bar', {}, new FormData())
    .then(console.warn.bind(null, '\t\t@ result @'));
}, 2000);
