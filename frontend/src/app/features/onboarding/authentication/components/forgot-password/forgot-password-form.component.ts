import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if (submitted) {
      <div class="space-y-4 text-center">
        <div class="p-4 bg-[#F9F5EE] rounded-xl border border-[#D4C9BD]">
          <p class="text-sm font-medium text-[#4A2E2B]">
            Enviamos um e-mail de recuperação para <span class="font-bold">{{ userEmail }}</span
            >.
          </p>
        </div>
        <p class="text-xs text-[#8C7A78]">
          Verifique sua caixa de entrada e spam para redefinir sua senha.
        </p>
        <button
          (click)="onBackToLogin()"
          class="w-full py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all cursor-pointer"
        >
          Voltar para o Login
        </button>
      </div>
    } @else {
      <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-1">
          <label for="forgot-email" class="block text-xs font-semibold text-[#8C7A78]"
            >E-mail cadastrado</label
          >
          <input
            id="forgot-email"
            type="email"
            formControlName="email"
            placeholder="seu@email.com"
            class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
          />
        </div>

        <button
          type="submit"
          [disabled]="forgotForm.invalid"
          class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Enviar Instruções
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
    }
  `,
})
export class ForgotPasswordFormComponent {
  private fb = inject(FormBuilder);

  @Output() backToLogin = new EventEmitter<void>();

  submitted = false;
  userEmail = '';

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.userEmail = this.forgotForm.value.email;
      this.submitted = true;
    }
  }

  onBackToLogin(): void {
    this.backToLogin.emit();
  }
}
