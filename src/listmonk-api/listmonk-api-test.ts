import { FetcheasyApiFactory } from '../fetcheasy/fetcheasy-factory';
import { logRequestInterceptor } from '../fetcheasy/request/request-interceptor';
import { logResponseInterceptor } from '../fetcheasy/response/interceptor/response-interceptor';
import { HttpError } from '../http/http';
import { ApiListmonkSubscribers } from './listmonk-api';

export const listmonkSubscribers = FetcheasyApiFactory.builder()
  .baseUrl('https://ml.welearn.schule')
  .basicAuthentication('listmonk', 'listmonk')
  .requestInterceptor(logRequestInterceptor)
  .responseInterceptor(logResponseInterceptor)
  .build(ApiListmonkSubscribers);

async function run() {
  const subscriber = await listmonkSubscribers.addSubscriber({
    email: 'sascha@welearn.schule',
    name: 'The Subscriber',
    status: 'enabled',
    lists: [1],
  });
  console.warn(`@ add subscriber ${subscriber.id} @`);

  const subscriberGEt = await listmonkSubscribers.get(subscriber.id);
  console.warn(`@ get subscriber ${subscriberGEt.id} @`);

  const delResult = await listmonkSubscribers.delete(subscriberGEt.id);
  console.warn(`@ deleted ${subscriberGEt.id} @`, delResult);

  try {
    const notFound = await listmonkSubscribers.get('102');
    console.warn('@ get ok @', notFound);
  } catch (error) {
    if (error instanceof HttpError) {
      console.warn(`@ get err ${error.status} @`, error.data);
    }
  }
}
run();
