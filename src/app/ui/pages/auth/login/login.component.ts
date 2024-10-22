import { Component } from '@angular/core';
import { AuthServiceService } from '../../../../services/auth.service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Snackbar for success/failure notifications

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginError: string = ''; // Holds error messages for invalid credentials, etc.

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Handle form submission and validation
  async onSubmit() {
    // Frontend validation
    if (!this.email || !this.password) {
      this.loginError = 'Email and password are required';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.loginError = 'Please enter a valid email address';
      return;
    }

    // Reset any previous login errors
    this.loginError = '';

    try {
      // Await the login service response
      const response = await this.authService.login(this.email, this.password);

      if (response && response.status === 200) {
        // On successful login, navigate to home and show success snackbar
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        if (response.status === 401) {
          this.loginError = 'Invalid credentials. Please try again.';
        } else if (response.status === 500) {
          this.loginError = 'Internal server error. Please try again later.';
        } else {
          this.loginError = response.message || 'Invalid credentials. Please try again.';
        }
      }
    } catch (error: any) {
      // Handle different errors (like network errors, server issues, etc.)
        this.loginError = 'Login failed. Please try again.';

      // Log the error for debugging purposes (optional)
      console.error('Login error:', error);
    }
  }

}
