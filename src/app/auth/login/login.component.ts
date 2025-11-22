import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    (this.auth as any).login({ username: this.username, password: this.password }).subscribe(() => {
      this.router.navigate(['/doctors']);
    });
  }
}
