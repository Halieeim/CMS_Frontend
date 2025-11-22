// medical-record.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  description?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private baseUrl = `${environment.API_BASE}/api/medical-records`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(this.baseUrl);
  }

  getById(id: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.baseUrl}/${id}`);
  }

  create(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`${this.baseUrl}/create`, record);
  }

  update(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.baseUrl}/update`, record);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
