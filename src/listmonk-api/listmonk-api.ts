import { Delete, Get, Post } from '../fetcheasy/decorators/method-decorators';
import { Json, PathParam } from '../fetcheasy/decorators/param-decorators';
import { responseDataUnwrap } from '../fetcheasy/response/mapper/response-mappers';
import { MediaType } from '../http/http-media-type';
import {
  ListmonkAddSubscriber,
  ListmonkSubscriber,
} from './model/listmonk-subscribers';

export class ApiListmonkSubscribers {
  @Get({
    path: '/api/subscribers/:id',
    responseMapper: responseDataUnwrap,
  })
  async get(@PathParam('id') id: string): Promise<ListmonkSubscriber> {
    return undefined as any;
  }

  @Post({
    path: '/api/subscribers',
    consumes: MediaType.APPLICATION_JSON,
    produces: MediaType.APPLICATION_JSON,
    responseMapper: responseDataUnwrap,
  })
  async addSubscriber(
    @Json() body: ListmonkAddSubscriber,
  ): Promise<ListmonkSubscriber> {
    return undefined as any;
  }

  @Delete('/api/subscribers/:id')
  async delete(@PathParam('id') id: string): Promise<void> {}
}
