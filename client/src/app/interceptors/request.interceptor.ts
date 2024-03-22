import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
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
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   this.cookieService.delete('auth');
        //   this.router.navigate(['/user/login']);
        // }
        throw error;
      })
    );
  }
}
