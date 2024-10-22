import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    // If token exists, redirect to dashboard
    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // If no token, allow access to the login page
    return true;
  }
}
