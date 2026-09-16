import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-[#F9F5EE] flex items-center justify-center p-4 font-sans">
      <div class="w-full max-w-md bg-white border border-[#76432F]/15 rounded-xl shadow-sm p-8">
        <div class="text-center mb-8">
          <div
            class="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#76432F] flex items-center justify-center shadow-sm"
          >
            <mat-icon class="!w-6 !h-6 !text-[24px] !text-white"> admin_panel_settings </mat-icon>
          </div>

          <h1 class="text-2xl font-semibold text-[#5A331F] tracking-tight">
            Painel Administrativo
          </h1>

          <p class="text-sm text-[#76432F]/65 mt-2">
            Entre com suas credenciais de Super Admin para continuar.
          </p>
        </div>

        <form (ngSubmit)="handleLogin()" class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-[#5A331F] uppercase tracking-wider mb-2">
              E-mail
            </label>

            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              autocomplete="email"
              placeholder="admin@plataforma.com"
              class="w-full text-sm border border-[#76432F]/20 rounded-lg px-3.5 py-2.5 bg-white text-[#3D241A] placeholder:text-[#76432F]/35 outline-none transition-all focus:border-[#76432F] focus:ring-2 focus:ring-[#76432F]/15"
              [disabled]="isLoading"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#5A331F] uppercase tracking-wider mb-2">
              Senha
            </label>

            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full text-sm border border-[#76432F]/20 rounded-lg pl-3.5 pr-11 py-2.5 bg-white text-[#3D241A] placeholder:text-[#76432F]/35 outline-none transition-all focus:border-[#76432F] focus:ring-2 focus:ring-[#76432F]/15"
                [disabled]="isLoading"
              />

              <button
                type="button"
                (click)="togglePasswordVisibility()"
                [disabled]="isLoading"
                class="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-[#76432F]/50 hover:text-[#76432F] disabled:opacity-40 transition-colors"
                [attr.aria-label]="showPassword ? 'Ocultar senha' : 'Visualizar senha'"
              >
                <mat-icon class="!w-5 !h-5 !text-[20px]">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </mat-icon>
              </button>
            </div>
          </div>

          <div class="min-h-[52px]">
            @if (errorMessage) {
              <div
                class="flex items-start gap-3 p-3.5 bg-[#FFF5F3] border border-[#D87D76]/30 text-[#9F4038] rounded-lg"
              >
                <mat-icon class="!w-5 !h-5 !text-[20px] shrink-0 mt-0.5"> error_outline </mat-icon>

                <div class="text-sm leading-5">
                  {{ errorMessage }}
                </div>
              </div>
            }
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full py-2.5 px-4 bg-[#76432F] hover:bg-[#5F3625] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            @if (isLoading) {
              <span
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              ></span>

              Entrando...
            } @else {
              <mat-icon class="!w-5 !h-5 !text-[20px]"> login </mat-icon>

              Entrar
            }
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);

  email = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  isLoading = false;

  handleLogin(): void {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Informe o e-mail e a senha para continuar.';
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.isLoading = true;
    this.changeDetectorRef.detectChanges();

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (!res?.accessToken) {
          this.errorMessage = 'E-mail ou senha inválidos.';
          this.changeDetectorRef.detectChanges();
          return;
        }

        this.authService.setAccessToken(res.accessToken);
        this.router.navigate(['/approval-shopkeeper']);
      },

      error: (err) => {
        this.isLoading = false;

        if (err?.status === 401) {
          this.errorMessage = 'E-mail ou senha inválidos.';
          this.changeDetectorRef.detectChanges();
          return;
        }

        this.errorMessage = this.getErrorMessage(err);
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private getErrorMessage(err: any): string {
    if (err?.status === 401) {
      return 'E-mail ou senha inválidos.';
    }

    if (err?.status === 403) {
      return 'Você não tem permissão para acessar o painel administrativo.';
    }

    if (err?.status === 404) {
      return 'Não foi possível localizar o serviço de autenticação.';
    }

    if (err?.status === 0) {
      return 'Não foi possível conectar ao servidor. Verifique se o backend está em execução.';
    }

    const error = err?.error;

    if (Array.isArray(error?.message)) {
      return error.message.join(' ');
    }

    if (typeof error?.message === 'string' && error.message.trim()) {
      return error.message === 'Unauthorized' ? 'E-mail ou senha inválidos.' : error.message;
    }

    if (typeof error === 'string' && error.trim()) {
      return error === 'Unauthorized' ? 'E-mail ou senha inválidos.' : error;
    }

    return 'Não foi possível realizar o login. Tente novamente.';
  }
}
