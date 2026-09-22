import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OnboardingAuthService } from '../../../core/services/onboarding-auth.service';
import { ForgotPasswordFormComponent } from './components/forgot-password/forgot-password-form.component';
import { ResetPasswordFormComponent } from './components/forgot-password/reset-password-form.component';
import { VerifyResetCodeFormComponent } from './components/forgot-password/verify-reset-code-form.component';
import { LoginFormComponent, LoginFormPayload } from './components/login-form.component';
import { RegisterFormComponent, RegisterFormPayload } from './components/register-form.component';

export type AuthMode = 'login' | 'register' | 'forgot' | 'verify-code' | 'reset';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    RegisterFormComponent,
    LoginFormComponent,
    ForgotPasswordFormComponent,
    ResetPasswordFormComponent,
    VerifyResetCodeFormComponent,
  ],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  private authService = inject(OnboardingAuthService);
  private router = inject(Router);

  mode = signal<AuthMode>('register');
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  resendCooldownStart = 0;
  userEmail = '';
  resetToken = '';

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

  onForgotPassword(email: string): void {
    this.userEmail = email;
    this.resendCooldownStart++;
    this.setMode('verify-code');
  }

  onVerifyResetCode(resetToken: string): void {
    this.resetToken = resetToken;
    this.setMode('reset');
  }

  onResetSuccess(message: string): void {
    this.setMode('login');

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message || 'Senha alterada com sucesso!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
