import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let clonedRequest = request.clone();

    const jwt = this.cookieService.get('auth');

    if (jwt) {
      clonedRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + jwt },
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        if (
          errorRes.status === 401 &&
          !errorRes.error.message.includes('Not logged in.')
        ) {
          this.cookieService.delete('auth');
          this.router.navigate(['/user/login']);
          return EMPTY;
        }

        throw errorRes;
      })
    );
  }
}

export const interceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestInterceptor,
  multi: true,
};
