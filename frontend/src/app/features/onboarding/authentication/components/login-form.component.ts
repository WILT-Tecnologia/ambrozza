import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface LoginFormPayload {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
        <label for="login-email" class="block text-xs font-semibold text-[#8C7A78]"> E-mail </label>

        <input
          id="login-email"
          type="email"
          formControlName="email"
          placeholder="seu@email.com"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />

        @if (emailControl.touched && emailControl.hasError('required')) {
          <p class="text-xs text-red-600">O e-mail é obrigatório.</p>
        }

        @if (emailControl.touched && emailControl.hasError('email')) {
          <p class="text-xs text-red-600">Digite um e-mail válido.</p>
        }
      </div>

      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <label for="login-password" class="block text-xs font-semibold text-[#8C7A78]">
            Senha
          </label>

          <button
            type="button"
            (click)="onForgotPassword()"
            class="text-xs text-[#8C3A32] hover:underline cursor-pointer"
          >
            Esqueceu a senha?
          </button>
        </div>

        <input
          id="login-password"
          type="password"
          formControlName="password"
          placeholder="••••••••"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />

        @if (passwordControl.touched && passwordControl.hasError('required')) {
          <p class="text-xs text-red-600">A senha é obrigatória.</p>
        }
      </div>

      @if (errorMessage) {
        <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p class="text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>
      }

      <button
        type="submit"
        [disabled]="loginForm.invalid || isSubmitting"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ isSubmitting ? 'Entrando...' : 'Entrar na Conta' }}
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  @Input() isSubmitting = false;
  @Input() errorMessage: string | null = null;

  @Output() login = new EventEmitter<LoginFormPayload>();
  @Output() forgotPassword = new EventEmitter<void>();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailControl() {
    return this.loginForm.controls['email'];
  }

  get passwordControl() {
    return this.loginForm.controls['password'];
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.login.emit(this.loginForm.value as LoginFormPayload);
  }

  onForgotPassword(): void {
    this.forgotPassword.emit();
  }
}
