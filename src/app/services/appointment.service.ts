// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = `${environment.API_BASE}/api/appointments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/create`, appointment);
  }

  update(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/update`, appointment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
