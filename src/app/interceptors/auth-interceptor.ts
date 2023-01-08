import { catchError, retry } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //debugger;
    const tokenSeguridad = localStorage.getItem('ru_token');

    if (!tokenSeguridad) {
      return next.handle(req);
    }

    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad),
    });

    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          localStorage.removeItem('ru_token');
          this.router.navigate(['/pages/login']);
        }
        return throwError(() => new Error('test'));
      })
    );
  }

}
