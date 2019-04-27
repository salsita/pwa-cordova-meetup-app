declare module 'cls-rtracer' {
  import * as Koa from 'koa';

  export interface KoaMiddlewareOptions {
    /** respect request header flag (default: `false`) */
    useHeader: boolean;
    /** request header name, used if `useHeader` is set to `true` (default: `X-Request-Id`) */
    headerName: string;
  }

  /**
   * Generates a request tracer middleware for Koa.
   * @param options possible options
   */
  export const koaMiddleware: (options?: KoaMiddlewareOptions) => Koa.Middleware;

  /**
   * Returns request tracer id or `undefined` in case if the call is made from an outside CLS context.
   */
  export const id: () => string | undefined;
}
