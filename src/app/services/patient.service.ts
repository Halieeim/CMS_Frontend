// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  gender?: string;
  medicalRecordIds?: number[];
  appointmentIds?: number[];
  billIds?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = `${environment.API_BASE}/api/patients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/create`, patient);
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/update`, patient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
