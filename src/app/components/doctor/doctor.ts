import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
  imports: [CommonModule]
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.loading = true;
    this.doctorService.getAll().subscribe({
      next: data => { this.doctors = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  deleteDoctor(id: number) {
    if (!confirm('Delete this doctor?')) return;
    this.doctorService.delete(id).subscribe(() => this.fetchDoctors());
  }
}
