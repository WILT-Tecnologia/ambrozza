import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div
        class="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6"
      >
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Painel Administrativo</h1>
          <p class="text-sm text-slate-500">
            Entre com suas credenciais de Super Admin para continuar.
          </p>
        </div>

        <form (ngSubmit)="handleLogin()" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >E-mail</label
            >
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              placeholder="admin@plataforma.com"
              class="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
              >Senha</label
            >
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              placeholder="••••••••"
              class="w-full text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          @if (errorMessage) {
            <div class="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {{ errorMessage }}
            </div>
          }

          <button
            type="submit"
            class="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  email = '';
  password = '';
  errorMessage = '';

  handleLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    const payload = { email: this.email, password: this.password };

    this.http.post<{ token: string }>('/api/auth/login', payload).subscribe({
      next: (res) => {
        this.authService.login(res.token);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Credenciais inválidas.';
      },
    });
  }
}
