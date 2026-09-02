import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnboardingAuthService } from './services/onboarding-auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
        @if (successMessage) {
          <div
            class="p-4 mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 text-sm rounded-r shadow-md flex justify-between items-center"
          >
            <span>{{ successMessage }}</span>

            <button
              type="button"
              class="font-bold text-lg text-green-700 hover:text-green-900 ml-4 cursor-pointer"
              (click)="successMessage = null"
            >
              &times;
            </button>
          </div>
        }
        @if (errorMessage) {
          <div
            class="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded-r shadow-md flex justify-between items-center"
          >
            <span>{{ errorMessage }}</span>
            <button
              type="button"
              class="font-bold text-lg text-red-700 hover:text-red-900 ml-4 cursor-pointer"
              (click)="errorMessage = null"
            >
              &times;
            </button>
          </div>
        }
        <label for="fullName" class="block text-xs font-semibold text-[#8C7A78]"
          >Nome completo</label
        >
        <input
          id="fullName"
          type="text"
          formControlName="fullName"
          placeholder="Digite seu nome"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      <div class="space-y-1">
        <label for="reg-email" class="block text-xs font-semibold text-[#8C7A78]">E-mail</label>
        <input
          id="reg-email"
          type="email"
          formControlName="email"
          placeholder="seu@email.com"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      <div class="space-y-1">
        <label for="reg-password" class="block text-xs font-semibold text-[#8C7A78]">Senha</label>
        <input
          id="reg-password"
          type="password"
          formControlName="password"
          placeholder="••••••••"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors"
        />
      </div>

      <div class="flex items-center gap-2 pt-2 text-sm text-[#8C7A78]">
        <input
          type="checkbox"
          id="terms"
          formControlName="agreeTerms"
          class="w-4 h-4 rounded border-[#D4C9BD] text-[#8C3A32] focus:ring-[#8C3A32]"
        />
        <label for="terms">
          Eu concordo com os
          <a href="#" class="text-[#8C3A32] underline hover:opacity-80">Termos e Condições</a>
        </label>
      </div>

      <button
        type="submit"
        [disabled]="registerForm.invalid || isLoading"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        @if (isLoading) {
          <span>Aguarde</span>
          <span
            class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
        } @else {
          <span>Cadastrar Conta</span>
        }
      </button>
    </form>
  `,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(OnboardingAuthService);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agreeTerms: [false, Validators.requiredTrue],
  });

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    const { fullName, email, password } = this.registerForm.value;

    this.authService.register({ name: fullName, email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message || 'Cadastro realizado com sucesso.';
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 429) {
          this.errorMessage = 'Ops! Algo deu errado. Tente novamente mais tarde.';
          this.cdr.markForCheck();
          return;
        }

        const backendMessage = err.error?.message;

        if (Array.isArray(backendMessage)) {
          this.errorMessage = backendMessage[0];
        } else {
          this.errorMessage = backendMessage || 'Erro ao realizar o cadastro.';
        }

        this.cdr.markForCheck();
      },
    });
  }
}
