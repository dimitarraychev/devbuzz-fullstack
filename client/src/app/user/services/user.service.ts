import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../types/user.type';
import {
  ApiUserResponse,
  AuthResponse,
  AuthUser,
  LogoutResponse,
} from '../../types/api.type';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  apiUrl = environment.apiUrl;

  private user$$ = new BehaviorSubject<AuthUser | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: AuthUser | undefined;
  private userSubscription: Subscription;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(userData: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.apiUrl + '/auth/login', userData)
      .pipe(tap((res) => this.user$$.next(res.user)));
  }

  register(userData: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.apiUrl + '/auth/register', userData)
      .pipe(tap((res) => this.user$$.next(res.user)));
  }

  authenticate() {
    return this.http.get<AuthResponse>(this.apiUrl + '/auth/authenticate').pipe(
      tap((res) => {
        if (res == null) this.cookieService.delete('auth');

        this.user$$.next(res.user);
      })
    );
  }

  setCookie(res: AuthResponse): void {
    if (res.token) this.cookieService.set('auth', res.token, 2);
  }

  logout(): void {
    this.http.get<LogoutResponse>(this.apiUrl + '/auth/logout').subscribe({
      next: (res) => {
        this.cookieService.delete('auth');
        this.user$$.next(undefined);
      },
      error: (e) => {
        this.cookieService.delete('auth');
        this.user$$.next(undefined);
      },
    });
  }

  getProfile(
    userId: string,
    page: number,
    limit: number
  ): Observable<ApiUserResponse> {
    return this.http.get<ApiUserResponse>(this.apiUrl + '/users/' + userId, {
      params: {
        page: page.toString(),
        limit: limit.toString(),
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
