import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="space-y-1">
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
        <label for="terms"
          >Eu concordo com os
          <a href="#" class="text-[#8C3A32] underline hover:opacity-80"
            >Termos e Condições</a
          ></label
        >
      </div>

      <button
        type="submit"
        [disabled]="registerForm.invalid"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Cadastrar Conta
      </button>
    </form>
  `,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agreeTerms: [false, Validators.requiredTrue],
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register payload:', this.registerForm.value);
    }
  }
}
