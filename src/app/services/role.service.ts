// role.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Role {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = `${environment.API_BASE}/api/roles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/create`, role);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/update`, role);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
