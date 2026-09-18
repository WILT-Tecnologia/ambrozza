import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingAuthService } from '../../../core/services/onboarding-auth.service';
import { ForgotPasswordFormComponent } from './components/forgot-password/forgot-password-form.component';
import { LoginFormComponent, LoginFormPayload } from './components/login-form.component';
import { RegisterFormComponent, RegisterFormPayload } from './components/register-form.component';

export type AuthMode = 'login' | 'register' | 'forgot';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, LoginFormComponent, ForgotPasswordFormComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  private authService = inject(OnboardingAuthService);
  private router = inject(Router);

  mode = signal<AuthMode>('register');
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  setMode(newMode: AuthMode): void {
    this.mode.set(newMode);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  onLogin({ email, password }: LoginFormPayload): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/onboarding']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err.error?.message ?? 'Não foi possível fazer login. Tente novamente.',
        );
      },
    });
  }

  onRegister({ name, email, password, confirmPassword }: RegisterFormPayload): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.register({ name, email, password, confirmPassword }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set(response.message || 'Cadastro realizado com sucesso.');
      },
      error: (err) => {
        this.isSubmitting.set(false);

        if (err.status === 429) {
          this.errorMessage.set('Ops! Algo deu errado. Tente novamente mais tarde.');
          return;
        }

        const backendMessage = err.error?.message;
        this.errorMessage.set(
          Array.isArray(backendMessage)
            ? backendMessage[0]
            : backendMessage || 'Erro ao realizar o cadastro.',
        );
      },
    });
  }
}
