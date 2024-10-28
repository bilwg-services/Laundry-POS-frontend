import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly baseUrl = `${environment.baseUrl}/expense`;

  constructor(
    private http: HttpClient,
  ) {}

  getAllExpenses(page: number = 1, limit: number = 10, sort: string = 'created_at', order: string = 'asc', search: string = '', filters: any = {}): Observable<any> {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in local storage
    const orgId = localStorage.getItem('organizationId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('getAllExpenses called>>,orgId', orgId);

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
    console.log('base url',this.baseUrl);
console.log('params',params);
    console.log('headers',headers);
    return this.http.get(`${this.baseUrl}`, { params, headers });
  }

  createExpense(expense: Expense): Observable<any> {
    const token = localStorage.getItem('authToken');
    const orgId = localStorage.getItem('organizationId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const expenseData = { ...expense, organization_id: orgId };

    return this.http.post(`${this.baseUrl}`, expenseData, { headers });
  }

  updateExpense(expenseId: number, expense: Expense): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/${expenseId}`, expense, { headers });
  }

  deleteExpense(expenseId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${expenseId}`, { headers });
  }

  getExpenseById(expenseId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/${expenseId}`, { headers });
  }
}
