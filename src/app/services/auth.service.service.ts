import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for error handling
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.http.post(`${this.baseUrl}/auth/login`, { email, password }).toPromise();
      console.log('API response:', response); // Log the full response

      // Ensure that the response structure matches your API output
      if (response && (response as any).status === 200) {
        const token = (response as any).token; // Use the correct path to get the token
        localStorage.setItem('authToken', token);
        console.log('Returning login successful with token:', token);
        return { status: 200, message: 'Login successful', token }; // Return the token and status
      } else {
        // If status is not 200, log and return failure details
        console.log('Login failed:', response);
        return { status: (response as any).status, message: (response as any).message || 'Login failed' };
      }
    } catch (error) {
      // Handle HttpErrorResponse and log additional error info
      if (error instanceof HttpErrorResponse) {
        console.error('Login service error:', error);
        return { status: error.status, message: error.error.message || 'Server error' };
      } else {
        // Catch any other unexpected errors
        console.log('Unexpected error during login:', error);
        return { status: 500, message: 'An unexpected error occurred' };
      }
    }
  }
}
