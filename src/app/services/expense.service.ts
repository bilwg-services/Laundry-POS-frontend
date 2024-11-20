import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getAllExpense(page: number = 1, limit: number = 10, sort: string = 'created_at', order: string = 'asc', search: string = '', filters: any = {}): Observable<any> {
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

    return this.http.get(`${this.baseUrl}/expense`, { params, headers});
  }


  createExpense(expense: Expense): Observable<any> {
    const token = localStorage.getItem('authToken');
    const orgId = localStorage.getItem('organizationId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const expenseData = { ...expense, organization_id: orgId };

    return this.http.post(`${this.baseUrl}/expense`, expenseData, { headers });
  }


  uploadCsv(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/expense/upload`, formData, { headers });
  }

}
