// import { Component, inject } from '@angular/core';
// import { AuthService } from './auth/auth.service';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   standalone: true,
//   imports: [RouterModule]
// })
// export class AppComponent {
//   year = new Date().getFullYear();

//   private auth = inject(AuthService);
//   private router = inject(Router);

//   logout() {
//     this.auth.logout();
//     this.router.navigate(['/login']);
//   }
// }