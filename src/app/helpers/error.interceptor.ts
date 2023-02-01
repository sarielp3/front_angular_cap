import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { catchError, Observable, throwError } from 'rxjs';
  import { SnackBarService } from '../services/snack-bar.service';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBarService: SnackBarService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((err) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.error instanceof ErrorEvent) {
              return throwError(err);
            } else {
              return this.httpErrorResponseManager(request, next, err);
            }
          } else {
            return throwError(err);
          }
        })
      );
    }
  
    httpErrorResponseManager(
      request: HttpRequest<any>,
      next: HttpHandler,
      err: any
    ): Observable<HttpEvent<any>> {
      switch (err.status) {
        case 404:
          this.snackBarService.openSnackBar(
            'warning',
            err.error.message,
            'Elemento no Encontrado'
          );
          break;
        case 400:
          this.snackBarService.openSnackBar(
            'warning',
            err.error.message,
            'No se puede procesar la solicitud'
          );
          break;
        case 422:
          this.snackBarService.openSnackBar(
            'warning',
            err.error.message,
            'Erro de de datos'
          );
          break;
        case 500:
          this.snackBarService.openSnackBar(
            'error',
            err.error.message,
            'Error Aplicativo'
          );
          break;
        default:
          // Redirect to the maintenance page
          break;
      }
      return throwError(err);
    }
  }
  