import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingSpinnerService } from './loading-spinner.service';
import { inject } from '@angular/core';

export const loadingSpinnerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  console.log('Starting loading spinner');
  const loadingSpinnerService = inject(LoadingSpinnerService);
  loadingSpinnerService.show();
  return next(req).pipe(
    finalize(() => {
      loadingSpinnerService.hide();
      console.log('Stopping loading spinner');
    })
  );
};
