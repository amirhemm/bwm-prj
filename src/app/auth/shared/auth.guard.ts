import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private url: string;
  constructor(private auth: AuthService,
              private route: Router) {}

  private handleAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      this.route.navigate(['/rentals']);
      return false;
    }
    return true;
  }

  private handleNotAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
      return true;
    }

    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.url = state.url;

    if (this.auth.isAuthenticated()) {
      return this.handleAuthState();
    }

    return this.handleNotAuthState();
  }
}
