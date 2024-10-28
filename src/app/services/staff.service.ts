import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environment';
import { Staff } from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}


  getAllStaff(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in local storage
    const orgId = localStorage.getItem('organizationId'); // Assuming the orgId is stored in local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('_complete', "true");

    return this.http.get(`${this.baseUrl}/user-organization/organization/${orgId}`, { params, headers});
  }


  createStaff(staff: any, password: String): Observable<any> {
    const token = localStorage.getItem('authToken');
    const orgId = localStorage.getItem('organizationId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const signupData = {
      email: staff.email.toLowerCase(),
      password: password,
      first_name: staff.first_name,
      last_name: staff.last_name,
      phone_number: staff.phone_number
    };

    return this.http.post(`${this.baseUrl}/auth/signup`, signupData, { headers }).pipe(
      switchMap((signupResponse: any) => {
        if (signupResponse.status === 200) {
          const userOrganizationData = {
            user_id: signupResponse.id,
            organization_id: orgId,
            role: staff.role,
            status: "active"
          };
          return this.http.post(`${this.baseUrl}/user-organization`, userOrganizationData, { headers });
        } else {
          throw new Error('User signup failed');
        }
      })
    );
  }


}
