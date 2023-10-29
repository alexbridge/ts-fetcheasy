import { MiddlewareChain, MiddlewareExchange } from './middleware-chain';

const reqToResp: MiddlewareExchange<Request, Response> = (req: Request) => {
  console.count('\t\tRequest 1 -> Response 1');
  return Promise.resolve(new Response());
};

const middleware = new MiddlewareChain<Request, Response>(reqToResp);

middleware.prepend(async (req: Request): Promise<Request> => {
  console.count('\tRequest 1 middleware');
  return req;
});

middleware.prepend(async (req: Request): Promise<Request> => {
  console.count('Request 2 middleware');
  return req;
});

middleware.append(async (res: Response): Promise<Response> => {
  console.count('\tResponse 1 middleware');
  return res;
});
middleware.append(async (res: Response): Promise<Response> => {
  console.count('Response 2 middleware');
  return res;
});

const middleware2 = new MiddlewareChain<Request, Response>((req: Request) => {
  console.count('\t\tRequest 2 -> Response 2');
  return Promise.resolve(new Response());
});

middleware2.prepend(async (req: Request): Promise<Request> => {
  console.count('\tRequest 2.1 middleware');
  return req;
});

middleware2.prepend(async (req: Request): Promise<Request> => {
  console.count('Request 2.2 middleware');
  return req;
});

middleware2.append(async (res: Response): Promise<Response> => {
  console.count('\tResponse 2.1 middleware');
  return res;
});
middleware2.append(async (res: Response): Promise<Response> => {
  console.count('Response 2.2 middleware');
  return res;
});
(async () => {
  await middleware.request(new Request('http://host'));
  console.count('------------------------');
  await middleware2.request(new Request('http://host'));
})();
