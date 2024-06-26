import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  console.log('Auth Interceptor');

  return authService.currentUser$.pipe(
    switchMap((user) => {
      if (!user) return next(req);

      return from(user.getIdToken()) // Convert Promise to Observable
        .pipe(
          switchMap((token) => {
            const modifiedReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next(modifiedReq);
          })
        );
    })
  );
};
