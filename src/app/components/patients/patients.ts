import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private patientService: PatientService = inject(PatientService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients() {
    this.patientService.getAll().subscribe({
      next: (data: Patient[]) => {
        this.patients = [...data];
        console.log(this.patients);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load patients', err);
        // if (err.status === 403 || (err.error?.message?.includes('Access') ?? true)) {
        //   alert('⚠ You are not authorized to perform this action.');
        // } else {
        //   alert('An unexpected error occurred.');
        // }
        this.cdr.detectChanges();
      }
    });
  }

  deletePatient(id: number) {
    if (!confirm('Delete this patient?')) return;
    this.patientService.delete(id).subscribe(() => this.fetchPatients());
  }
}
