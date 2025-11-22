import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  appointmentIds?: number[];
  medicalRecordIds?: number[];
  yearsOfExperience: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private http = inject(HttpClient);
  private API_URL = `${environment.API_BASE}/api/doctors`;

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.API_URL);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.API_URL}/${id}`);
  }

  create(data: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.API_URL}/create`, data);
  }

  update(data: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.API_URL}/update`, data);
  }

  delete(id: number|undefined): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  findBySpecialization(spec: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API_URL}/specialization/${spec}`);
  }

  findByExperience(minYears: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API_URL}/experience/${minYears}`);
  }
}
