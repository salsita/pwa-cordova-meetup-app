import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';

import { ErrorCause } from '@models';

export function extractError(err: Error) {
  return process.env.NODE_ENV === 'development' ? err : 'There has been a problem processing your request.';
}

export abstract class ErrorWithCause extends Error {
  readonly statusCode: number;
  readonly cause: ErrorCause;

  constructor(cause: ErrorCause, statusCode: number, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorWithCause);
    }

    this.cause = cause;
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ErrorWithCause {
  constructor(cause: ErrorCause, ...params: any[]) {
    super(cause, BAD_REQUEST, ...params);
    this.name = 'BadRequestError';
  }
}

export class NotAuthorizedError extends ErrorWithCause {
  constructor(cause: ErrorCause, ...params: any[]) {
    super(cause, UNAUTHORIZED, ...params);
    this.name = 'NotAuthorizedError';
  }
}

export class NotFoundError extends ErrorWithCause {
  constructor(cause: ErrorCause, ...params: any[]) {
    super(cause, NOT_FOUND, ...params);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends ErrorWithCause {
  constructor(cause: ErrorCause, ...params: any[]) {
    super(cause, FORBIDDEN, ...params);
    this.name = 'ForbiddenError';
  }
}

export class ServerError extends ErrorWithCause {
  constructor(cause: ErrorCause, ...params: any[]) {
    super(cause, INTERNAL_SERVER_ERROR, ...params);
    this.name = 'ServerError';
  }
}
