import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import * as Koa from 'koa';

import { ErrorWithCause, extractError } from './errors';
import logger from './logger';

export function errorHandler(/* options */) {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      logger.info(`Processing request to ${ctx.request.url}`);

      await next();

      if (ctx.status >= 400) {
        logger.info({
          message: `Request flow successful, but status is erroneous ${ctx.status}`,
          body: ctx.body,
        });
      } else {
        logger.info(`Request processed successfully, status ${ctx.status}`);
      }
    } catch (err) {
      if (err instanceof ErrorWithCause || err.cause) {
        const errCause = err as ErrorWithCause;
        ctx.status = errCause.statusCode;
        ctx.body = { cause: errCause.cause, message: errCause.message };
      } else {
        ctx.status = INTERNAL_SERVER_ERROR;
        ctx.body = extractError(err);
      }

      logger.error({
        message: `Request processing failed, status ${ctx.status}, message '${err.message}'`,
        error: err,
      });
    }
  };
}
