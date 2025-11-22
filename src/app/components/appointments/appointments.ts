import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.css'],
  imports: [CommonModule]
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.loading = true;
    this.appointmentService.getAll().subscribe({
      next: data => { this.appointments = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  deleteAppointment(id: number) {
    if (!confirm('Delete this appointment?')) return;
    this.appointmentService.delete(id).subscribe(() => this.fetchAppointments());
  }
}
