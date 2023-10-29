export type MiddlewareExchange<T, R> = (req: T) => Promise<R>;
export type RequestMiddleware<T> = (req: T) => Promise<T>;
export type ResultMiddleware<T> = (res: T) => Promise<T>;

export class MiddlewareChain<T, R> {
  middlewareChain: MiddlewareExchange<T, R>;

  constructor(requestChain: MiddlewareExchange<T, R>) {
    this.middlewareChain = requestChain;
  }

  prepend(middleware: RequestMiddleware<T>): void {
    this.middlewareChain = ((prev) => async (req: T) => {
      return prev(await middleware(req));
    })(this.middlewareChain);
  }

  append(middleware: ResultMiddleware<R>): void {
    this.middlewareChain = ((next) => async (req: T) => {
      return middleware(await next(req));
    })(this.middlewareChain);
  }

  async request(req: T): Promise<R> {
    return this.middlewareChain(req);
  }
}
