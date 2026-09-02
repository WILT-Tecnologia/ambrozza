import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  login(token: string): void {
    localStorage.setItem('admin_token', token);
    this.isAuthenticatedSignal.set(true);
    this.router.navigate(['/admin/approvals']);
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
}
