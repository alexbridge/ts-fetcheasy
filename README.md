## Fetcheasy, declarative typescript API

Decorator based declarative API clients.

### Installation

Install NPM package:

```sh
npm install ts-fetcheasy --save
```

**Limitation:** Min nodejs version is 18.0.0, which have `fetch` API globally available without polyfill, etc.

### Usage

#### Define API (as class)

```ts
import { Get, Json, MediaType, PathParam, Post } from 'fetcheasy';

export class BooksApi {
  @Get({ path: '/books/:id', consumes: MediaType.APPLICATION_JSON })
  async get(@PathParam('id') id: string): Promise<Book> {}

  @Post({ path: '/books', consumes: MediaType.APPLICATION_JSON })
  async add(@Json() jsonData: object): Promise<Book> {}

  @Delete('/books/:id')
  async delete(@PathParam('id') id: string): Promise<Response> {}
}
```

#### Get defined API via factory and use

```ts
const booksApi = FetcheasyApiFactory.builder()
  .baseUrl('http://host')
  .basicAuthentication('test', 'test')
  .build(BooksApi);

// Add new book
let book = booksApi.add({ name: 'book' });
// Get book by id
book = booksApi.get('1');
// Delete book by id
booksApi.delete('1');
```

### Frameworks integrations

#### Nestjs (typescript / nodejs)

```ts
import {
  FetcheasyApiFactory,
  logRequestInterceptor,
  logResponseInterceptor,
} from 'ts-fetcheasy';

@Module({
  providers: [
    {
      provide: BooksApi,
      useFactory: (configService: ConfigService) => {
        return FetcheasyApiFactory.builder()
          .baseUrl(configService.getOrThrow('BASE_PATH'))
          .basicAuthentication(
            configService.getOrThrow('USER'),
            configService.getOrThrow('PASS'),
          )
          .requestInterceptor(logRequestInterceptor)
          .responseInterceptor(logResponseInterceptor)
          .build(BooksApi);
      },
      inject: [ConfigService],
    },
  ],
  exports: [BooksApi],
})
export class BooksModule {}
```
