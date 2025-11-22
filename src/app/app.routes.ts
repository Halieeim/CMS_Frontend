import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
// import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
// import { DoctorFormComponent } from './doctors/doctor-form/doctor-form.component';
import { UsersComponent } from './components/users/users';
import { PatientsComponent } from './components/patients/patients';
import { AppointmentsComponent } from './components/appointments/appointments';
import { DoctorsComponent } from './components/doctor/doctor';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard] },
  // { path: 'doctors/new', component: DoctorFormComponent, canActivate: [AuthGuard] },
  // { path: 'doctors/edit/:id', component: DoctorFormComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/doctors' }
];
