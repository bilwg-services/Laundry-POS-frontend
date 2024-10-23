import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getAllCustomers(page: number = 1, limit: number = 10, sort: string = 'created_at', order: string = 'asc', search: string = '', filters: any = {}): Observable<any> {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in local storage
    const orgId = localStorage.getItem('organizationId'); // Assuming the orgId is stored in local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('org_id', orgId || '')
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order)
      .set('search', search);

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        params = params.set(`filters[${key}]`, filters[key]);
      }
    }

    return this.http.get(`${this.baseUrl}/customers`, { params, headers});
  }
  
}
