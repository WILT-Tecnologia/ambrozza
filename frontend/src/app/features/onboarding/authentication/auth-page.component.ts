import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ForgotPasswordFormComponent } from './components/forgot-password/forgot-password-form.component';
import { LoginFormComponent } from './components/login-form.component';
import { RegisterFormComponent } from './components/register-form.component';

export type AuthMode = 'login' | 'register' | 'forgot';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, LoginFormComponent, ForgotPasswordFormComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  mode = signal<AuthMode>('register');

  setMode(newMode: AuthMode): void {
    this.mode.set(newMode);
  }
}
