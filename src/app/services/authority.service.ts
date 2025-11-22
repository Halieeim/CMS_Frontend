// authority.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Authority {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  private baseUrl = `${environment.API_BASE}/api/authorities`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Authority[]> {
    return this.http.get<Authority[]>(this.baseUrl);
  }

  getById(id: number): Observable<Authority> {
    return this.http.get<Authority>(`${this.baseUrl}/${id}`);
  }

  create(authority: Authority): Observable<Authority> {
    return this.http.post<Authority>(`${this.baseUrl}/create`, authority);
  }

  update(authority: Authority): Observable<Authority> {
    return this.http.put<Authority>(`${this.baseUrl}/update`, authority);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
