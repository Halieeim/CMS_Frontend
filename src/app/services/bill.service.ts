// bill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Bill {
  id: number;
  patientId: number;
  amount: number;
  status?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = `${environment.API_BASE}/api/bills`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseUrl);
  }

  getById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/${id}`);
  }

  create(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/create`, bill);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.baseUrl}/update`, bill);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
