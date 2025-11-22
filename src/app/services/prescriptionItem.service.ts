// prescription-item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PrescriptionItem {
  id: number;
  medicalRecordId: number;
  medicineName: string;
  dosage: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionItemService {
  private baseUrl = `${environment.API_BASE}/api/prescription-items`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PrescriptionItem[]> {
    return this.http.get<PrescriptionItem[]>(this.baseUrl);
  }

  getById(id: number): Observable<PrescriptionItem> {
    return this.http.get<PrescriptionItem>(`${this.baseUrl}/${id}`);
  }

  create(item: PrescriptionItem): Observable<PrescriptionItem> {
    return this.http.post<PrescriptionItem>(`${this.baseUrl}/create`, item);
  }

  update(item: PrescriptionItem): Observable<PrescriptionItem> {
    return this.http.put<PrescriptionItem>(`${this.baseUrl}/update`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
