import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule]
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  logout() {
    // Clear localStorage/sessionStorage or call API
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // redirect to login
  }

}
