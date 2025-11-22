import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      if (err.status === 403 || (err.error?.message?.includes('Access') ?? true)) {
        alert('⚠ You are not authorized to perform this action.');
      } else {
        alert('An unexpected error occurred.');
      }
      throw err;
    })
  );
};

@Injectable()
export class ErrorInterceptor {

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(req).pipe(
  //     catchError((err: HttpErrorResponse) => {

  //       // 🔥 Your logic here
  //       if (err.status === 403 || (err.error?.message?.includes('Access') ?? true)) {
  //         alert('⚠ You are not authorized to perform this action.');
  //       } else {
  //         alert('An unexpected error occurred.');
  //       }

  //       return throwError(() => err);
  //     })
  //   );
  // }
}
