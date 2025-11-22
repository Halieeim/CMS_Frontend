import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DoctorService, Doctor } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css'],
  imports: [CommonModule],
  standalone: true,
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  private doctorService: DoctorService = inject(DoctorService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getAll().subscribe({
      next: (data: Doctor[]) => {
        this.doctors = [...data];
        console.log(this.doctors);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load doctors', err);
        this.cdr.detectChanges();
      }
    });
  }

  deleteDoctor(id: number) {
    if (!confirm('Delete this doctor?')) return;
    this.doctorService.delete(id).subscribe({
      next: () => {
        this.doctors = this.doctors.filter(d => d.id !== id);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to delete doctor', err);
      }
    });
  }

  trackById(index: number, item: Doctor) {
    return item.id;
  }
}
