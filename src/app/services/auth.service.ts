import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'; // Import HttpErrorResponse for error handling
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}


  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.http.post(`${this.baseUrl}/auth/login`, { email, password }).toPromise();
      console.log('API response:', response); // Log the full response

      if (response && (response as any).status === 200) {
        const token = (response as any).token; // Use the correct path to get the token
        localStorage.setItem('authToken', token);


        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const userId = (response as any).id;
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('User ID saved>>>:', userId);
        } else {
          // Fetch user info to get user id
          const userResponse = await this.getCurrentUser();
          if (userResponse && userResponse.id) {
            localStorage.setItem('userId', userResponse.id.toString());
          } else {
            console.log('User ID not available in response:', userResponse);
          }
        }


        // Call the user-organization API
        const orgResponse = await this.http.get(`${this.baseUrl}/user-organization/`, {headers}).toPromise();
        console.log('User organization response:', orgResponse);

        if (orgResponse && (orgResponse as any).status === 200) {
          const orgData = (orgResponse as any).data;

          if (orgData.length === 1) {
            localStorage.setItem('organizationId', orgData[0].organization_id);
          } else if (orgData.length > 1) {
            // Redirect to the role selection page
            this.router.navigate(['/select-role'], { state: { roles: orgData } });
          }
        } else {
          console.log('Failed to fetch user organization data:', orgResponse);
        }

        return { status: 200, message: 'Login successful', token }; // Return the token and status
      } else {
        console.log('Login failed:', response);
        return { status: (response as any).status, message: (response as any).message || 'Login failed' };
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Login service error:', error);
        return { status: error.status, message: error.error.message || 'Server error' };
      } else {
        console.log('Unexpected error during login:', error);
        return { status: 500, message: 'An unexpected error occurred' };
      }
    }
  }

  async getCurrentUser(): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      await this.router.navigate(['/login']);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const response = await this.http.get(`${this.baseUrl}/auth`, {headers}).toPromise();
      console.log('Current user response:', response);
      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Get current user service error:', error);
        return {status: error.status, message: error.error.message || 'Server error'};
      } else {
        console.log('Unexpected error during get current user:', error);
        return {status: 500, message: 'An unexpected error occurred'};
      }
    }
  }


  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
