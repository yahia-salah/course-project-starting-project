import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { SweetAlertService } from './sweetalert.service';

export const toastInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const toastService = inject(SweetAlertService);
  return next(req).pipe(
    catchError((error) => {
      toastService.showToast({
        content: error.message,
        icon: 'error',
      });
      return throwError(() => error);
    }),
    tap({
      complete: () => {
        console.log('Request completed');
        toastService.showToast({
          content: 'Request completed',
          icon: 'success',
        });
      },
    })
  );
};
