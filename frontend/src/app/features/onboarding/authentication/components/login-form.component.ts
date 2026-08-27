import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
        <label for="login-email" class="block text-xs font-semibold text-[#8C7A78]">E-mail</label>
        <input
          id="login-email"
          type="email"
          formControlName="email"
          placeholder="seu@email.com"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <label for="login-password" class="block text-xs font-semibold text-[#8C7A78]"
            >Senha</label
          >
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
      </div>

      <button
        type="submit"
        [disabled]="loginForm.invalid"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Entrar na Conta
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  @Output() forgotPassword = new EventEmitter<void>();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login payload:', this.loginForm.value);
    }
  }

  onForgotPassword(): void {
    this.forgotPassword.emit();
  }
}
