import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from './ApiService';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const api = inject(ApiService);

  const isSetTokenCall =
    req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register');

  if (isSetTokenCall) {
    return next(req);
  }

  const authToken = api.getAuthToken();
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
