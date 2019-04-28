import { HttpErrorResponse } from '@angular/common/http';

import { ErrorCause } from '@models';

export function extractError(err: HttpErrorResponse): ErrorCause {
  if (err.error instanceof Event) {
    return ErrorCause.Offline;
  }

  const errorBody = err.error;

  return errorBody.cause ? errorBody.cause : ErrorCause.NotSpecified;
}
