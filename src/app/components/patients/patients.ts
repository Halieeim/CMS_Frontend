import { Component, OnInit } from '@angular/core';
import { PatientService, Patient } from '../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.html',
  styleUrls: ['./patients.css'],
  imports: [CommonModule],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  loading = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients() {
    this.loading = true;
    this.patientService.getAll().subscribe({
      next: data => { this.patients = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  deletePatient(id: number) {
    if (!confirm('Delete this patient?')) return;
    this.patientService.delete(id).subscribe(() => this.fetchPatients());
  }
}
