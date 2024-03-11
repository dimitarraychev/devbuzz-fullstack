import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../types/user.type';
import { AuthResponse } from '../types/api.type';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get isLogged() {
    return !!this.cookieService.get('auth');
  }

  get userInfo() {
    if (!this.isLogged) return null;

    const info = localStorage.getItem('user');
    if (!info) return null;

    return JSON.parse(info);
  }

  login(userData: User) {
    return this.http.post<User>(this.apiUrl + '/users/login', userData);
  }

  register(userData: User) {
    return this.http.post<AuthResponse>(
      this.apiUrl + '/users/register',
      userData
    );
  }
}
