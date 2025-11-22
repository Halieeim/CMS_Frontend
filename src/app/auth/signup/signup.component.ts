import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  styleUrl: './signup.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  specializations: string[] = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'General Medicine',
    'Orthopedics'
  ];

  signUpForm = this.fb.group({
    isDoctor: [false],
    username: [''],
    password: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [''],
    gender: [''],
    address: [''],
    dateOfBirth: [''],

    // Doctor fields
    specialization: [''],
    yearsOfExperience: [null],

    // Patient fields
    emergencyContactName: [''],
    emergencyContactPhone: ['']
  });

  onSignup() {
    const form = this.signUpForm.value;

    const payload: any = {
      id: null,
      isDoctor: form.isDoctor,
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      gender: form.gender,
      address: form.address,
      dateOfBirth: form.dateOfBirth
    };

    if (form.isDoctor) {
      payload.specialization = form.specialization;
      payload.yearsOfExperience = form.yearsOfExperience;
    } else {
      payload.emergencyContactName = form.emergencyContactName;
      payload.emergencyContactPhone = form.emergencyContactPhone;
    }

    this.auth.signup(payload).subscribe(() => {
      this.router.navigate(['/doctors']);
    });
  }
}
