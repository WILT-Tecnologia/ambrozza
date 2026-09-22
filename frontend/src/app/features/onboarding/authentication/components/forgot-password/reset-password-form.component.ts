import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { OnboardingAuthService } from '../../../../../core/services/onboarding-auth.service';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
        <label for="new-password" class="block text-xs font-semibold text-[#8C7A78]">
          Nova senha
        </label>

        <input
          id="new-password"
          type="password"
          formControlName="newPassword"
          placeholder="Digite sua nova senha"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      <div class="space-y-1">
        <label for="confirm-password" class="block text-xs font-semibold text-[#8C7A78]">
          Confirmar nova senha
        </label>

        <input
          id="confirm-password"
          type="password"
          formControlName="confirmPassword"
          placeholder="Digite a senha novamente"
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
        [disabled]="resetForm.invalid || isLoading"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ isLoading ? 'Alterando...' : 'Alterar senha' }}
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
export class ResetPasswordFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(OnboardingAuthService);

  @Input({ required: true }) resetToken = '';

  @Output() backToLogin = new EventEmitter<void>();
  @Output() resetSuccess = new EventEmitter<string>();

  isLoading = false;
  errorMessage = '';

  resetForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.resetForm.invalid || this.isLoading) {
      return;
    }

    const { newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService
      .resetPassword({
        resetToken: this.resetToken,
        newPassword,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.resetSuccess.emit(response.message);
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          this.errorMessage = Array.isArray(backendMessage)
            ? backendMessage[0]
            : backendMessage || 'Não foi possível alterar a senha.';
        },
      });
  }

  onBackToLogin(): void {
    this.backToLogin.emit();
  }
}
