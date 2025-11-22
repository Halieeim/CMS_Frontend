import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API_URL = `${environment.API_BASE}`;

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.API_URL}/authenticate`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        }),
        catchError(err => {

          if (err.status === 401) {
            alert("❌ Invalid username or password."); // You can replace this with a nice popup
          } else {
            alert("⚠️ Something went wrong. Please try again.");
          }

          return throwError(() => err);
        })
      );
  }
  

  signup(data: any) {
    this.logout();
    return this.http.post<any>(`${this.API_URL}/signup`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      }),
      catchError(err => {
        alert("⚠️ Something went wrong. Please try again.");
        return throwError(() => err);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  /**
   * Parse a JWT and return its payload, or null on failure.
   */
  private parseJwt(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      // base64url -> base64
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      // pad string to proper length
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
      const decoded = atob(padded);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }

  /**
   * Returns true if the token is expired or invalid.
   */
  private isTokenExpired(token?: string): boolean {
    const t = token ?? this.getToken();
    if (!t) return true;
    const payload = this.parseJwt(t);
    if (!payload) return true;
    const exp = payload.exp;
    if (!exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
