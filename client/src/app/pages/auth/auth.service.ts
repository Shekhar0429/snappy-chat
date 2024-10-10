import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignUpLoginDetail } from './models.ts/sign_up';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const URL = environment.url;
const SIGN_UP = URL + '/api/auth/signup';
const LOGIN = URL + '/api/auth/login';
const USER_INFO = URL + '/api/auth/user-info';
const LOG_OUT = URL + '/api/auth/logout';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userDetail: SignUpLoginDetail): Observable<any> {
    return this.http.post(SIGN_UP, userDetail, { withCredentials: true });
  }

  login(userDetail: SignUpLoginDetail): Observable<any> {
    return this.http.post(LOGIN, userDetail, { withCredentials: true });
  }

  logOut(): Observable<any> {
    return this.http.get(LOG_OUT);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(USER_INFO, { withCredentials: true });
  }
}
