import { HttpErrorResponse } from '@angular/common/http';

export function parseErrorRes(response: HttpErrorResponse): string {
  let message: string;
  if (Array.isArray(response.error?.message)) {
    message = response.error.message.join('; ');
  } else {
    message = response.error?.message || 'Unknown error';
  }
  const statusCode =
    response?.status || response?.error?.statusCode || 'No status code';
  const errorDetail =
    response?.error?.error ||
    response?.statusText ||
    'No additional error details';

  return `Status Code: ${statusCode} (${errorDetail}) \nMessage: ${message}`;
}
