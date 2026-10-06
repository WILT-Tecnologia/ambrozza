import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { OnboardingAuthService } from '../../../../../core/services/onboarding-auth.service';

@Component({
  selector: 'app-verify-reset-code-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="verifyForm" (ngSubmit)="onSubmit()" class="space-y-6">
      @if (successMessage) {
        <div class="p-3 rounded-xl bg-green-50 border border-green-200">
          <p class="text-sm text-green-700">
            {{ successMessage }}
          </p>
        </div>
      }

      <div class="space-y-1">
        <label for="reset-code" class="block text-xs font-semibold text-[#8C7A78]">
          Código de recuperação
        </label>

        <input
          id="reset-code"
          type="text"
          inputmode="numeric"
          maxlength="6"
          formControlName="code"
          placeholder="000000"
          class="w-full py-2 bg-transparent border-b border-[#D4C9BD] text-[#4A2E2B] font-medium placeholder-[#8C7A78]/50 focus:outline-none focus:border-[#8C3A32] transition-colors tracking-[0.3em]"
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
        [disabled]="verifyForm.invalid || isLoading || isResending"
        class="w-full mt-4 py-3.5 px-4 bg-[#8C3A32] hover:bg-[#722E28] text-white font-semibold rounded-full shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ isLoading ? 'Verificando...' : 'Continuar' }}
      </button>

      <div class="text-center pt-1">
        @if (resendCooldown > 0) {
          <p class="text-xs text-[#8C7A78]">
            Não recebeu o código?
            <span class="font-semibold"> Reenviar em {{ resendCooldown }}s </span>
          </p>
        } @else {
          <button
            type="button"
            (click)="onResendCode()"
            [disabled]="isResending"
            class="text-xs text-[#8C3A32] hover:text-[#722E28] font-semibold underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isResending ? 'Enviando...' : 'Reenviar código' }}
          </button>
        }
      </div>

      <div class="text-center pt-1">
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
export class VerifyResetCodeFormComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(OnboardingAuthService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  @Input() startCooldown = 0;
  @Input({ required: true }) email = '';

  @Output() backToLogin = new EventEmitter<void>();
  @Output() codeVerified = new EventEmitter<string>();

  private resendInterval: ReturnType<typeof setInterval> | null = null;

  isLoading = false;
  isResending = false;
  errorMessage = '';
  successMessage = 'Código enviado! Verifique seu e-mail.';
  resendCooldown = 60;

  verifyForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startCooldown'] && this.startCooldown > 0) {
      this.successMessage = 'Código enviado! Verifique seu e-mail.';
      this.errorMessage = '';
      this.startResendCooldown();
    }
  }
  onSubmit(): void {
    if (this.verifyForm.invalid || this.isLoading || this.isResending) {
      return;
    }

    const code = this.verifyForm.value.code;

    this.errorMessage = '';
    this.isLoading = true;

    this.changeDetectorRef.detectChanges();

    this.authService
      .verifyResetCode({
        email: this.email,
        code,
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe({
        next: (response) => {
          this.codeVerified.emit(response.resetToken);
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          this.errorMessage = Array.isArray(backendMessage)
            ? backendMessage[0]
            : backendMessage || 'Código de recuperação inválido.';

          this.changeDetectorRef.detectChanges();
        },
      });
  }

  onResendCode(): void {
    if (this.resendCooldown > 0 || this.isResending) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isResending = true;

    this.changeDetectorRef.detectChanges();

    this.authService
      .resendResetCode({
        email: this.email,
      })
      .pipe(
        finalize(() => {
          this.isResending = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Código enviado! Verifique seu e-mail.';

          this.startResendCooldown();

          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          this.errorMessage = Array.isArray(backendMessage)
            ? backendMessage[0]
            : backendMessage || 'Não foi possível reenviar o código.';

          this.changeDetectorRef.detectChanges();
        },
      });
  }

  private startResendCooldown(): void {
    this.resendCooldown = 60;

    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }

    this.resendInterval = setInterval(() => {
      if (this.resendCooldown > 0) {
        this.resendCooldown--;
        this.changeDetectorRef.detectChanges();
      }

      if (this.resendCooldown === 0 && this.resendInterval) {
        clearInterval(this.resendInterval);
        this.resendInterval = null;
      }
    }, 1000);
  }

  onBackToLogin(): void {
    this.backToLogin.emit();
  }

  ngOnDestroy(): void {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }
}
