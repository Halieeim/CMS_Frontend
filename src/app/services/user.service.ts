// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.API_BASE}/api/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/adduser`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
