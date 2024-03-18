import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../types/user.type';
import { AuthResponse, LogoutResponse } from '../types/api.type';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get isLogged(): boolean {
    return !!this.cookieService.get('auth');
  }

  get userInfo(): { username: string; _id: string } | null {
    if (!this.isLogged) return null;

    const info = localStorage.getItem('user');
    if (!info) return null;

    return JSON.parse(info);
  }

  login(userData: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/users/login', userData);
  }

  register(userData: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.apiUrl + '/users/register',
      userData
    );
  }

  setCookieAndStorage(res: AuthResponse): void {
    this.cookieService.set('auth', res.token, 7);
    localStorage.setItem(
      'user',
      JSON.stringify({ username: res.username, _id: res._id })
    );
  }

  logout(): void {
    this.http.get<LogoutResponse>(this.apiUrl + '/users/logout').subscribe({
      next: (res) => {
        this.cookieService.delete('auth');
        localStorage.removeItem('user');
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
}
