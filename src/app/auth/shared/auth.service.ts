import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { map } from 'rxjs/operators';


const jwt = new JwtHelperService();

class DecodedToken {
  exp = 0;
  username = '';
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm-meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm-auth', token);
    localStorage.setItem('bwm-meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration() {
      return moment.unix(this.decodedToken.exp);
  }

  register(registrationData: any): Observable<any> {
    return this.http.post(`/api/v1/users/register`, registrationData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`/api/v1/users/auth`, loginData).pipe(map((token: string) => this.saveToken(token)));
  }

  logout() {
    localStorage.removeItem('bwm-auth');
    localStorage.removeItem('bwm-meta');

    this.decodedToken = new DecodedToken();
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getToken(): string {
    return localStorage.getItem('bwm-auth');
  }

  getUsername(): string {
    return this.decodedToken.username;
  }



}
