import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { OnboardingAuthService } from '../../../../../core/services/onboarding-auth.service';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
        <label for="forgot-email" class="block text-xs font-semibold text-[#8C7A78]">
          E-mail cadastrado
        </label>

        <input
          id="forgot-email"
          type="email"
          formControlName="email"
          placeholder="seu@email.com"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      @if (errorMessage) {
        <div class="p-3 rounded-xl bg-red-50 border border-red-200">
          <p class="text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>
      }

      <button
        type="submit"
        [disabled]="forgotForm.invalid || isLoading"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ isLoading ? 'Enviando...' : 'Enviar Instruções' }}
      </button>

      <div class="text-center pt-2">
        <button
          type="button"
          (click)="onBackToLogin()"
          class="text-xs text-[#8C7A78] hover:text-[#4A2E2B] underline cursor-pointer"
        >
          Voltar ao Login
        </button>
      </div>
    </form>
  `,
})
export class ForgotPasswordFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(OnboardingAuthService);

  @Output() backToLogin = new EventEmitter<void>();
  @Output() forgotPasswordSuccess = new EventEmitter<string>();

  isLoading = false;
  errorMessage = '';

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.forgotForm.invalid || this.isLoading) {
      return;
    }

    const email = this.forgotForm.value.email;

    this.errorMessage = '';
    this.isLoading = true;

    this.authService
      .forgotPassword({
        email,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.forgotPasswordSuccess.emit(email);
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          this.errorMessage = Array.isArray(backendMessage)
            ? backendMessage[0]
            : backendMessage || 'Não foi possível enviar o e-mail de recuperação.';
        },
      });
  }

  onBackToLogin(): void {
    this.backToLogin.emit();
  }
}
