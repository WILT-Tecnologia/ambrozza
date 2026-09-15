import { HttpInterceptorFn } from '@angular/common/http';
import { inject, REQUEST } from '@angular/core';

export const ssrCookieInterceptor: HttpInterceptorFn = (req, next) => {
  const request = inject(REQUEST, { optional: true });

  if (request) {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      req = req.clone({
        setHeaders: { cookie: cookieHeader },
        withCredentials: true,
      });
    }
  }

  return next(req);
};
