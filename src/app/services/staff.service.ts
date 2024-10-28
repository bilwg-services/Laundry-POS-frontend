import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

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

}
