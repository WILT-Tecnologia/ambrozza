import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
export type AccountStatus = 'PENDENTE' | 'APROVADO' | 'REJEITADO';

export interface RefreshResponse {
  accessToken: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  status: AccountStatus;
}

export interface LoginResponse {
  accessToken: string;
  superUser: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;
  private refreshPromise: Promise<boolean> | null = null;
  private currentUser = signal<UserAccount | null>(null);
  private accessTokenSignal = signal<string | null>(null);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/admin-auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  }

  setAccessToken(token: string): void {
    this.accessTokenSignal.set(token);
  }

  getAccessToken(): string | null {
    return this.accessTokenSignal();
  }

  refresh(): Observable<RefreshResponse> {
    return this.http.post<RefreshResponse>(
      `${this.apiUrl}/admin-auth/refresh`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.currentUser() !== null || this.accessTokenSignal() !== null) {
      return true;
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = firstValueFrom(this.refresh())
      .then((response) => {
        this.setAccessToken(response.accessToken);
        return true;
      })
      .catch((error) => {
        return false;
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }
  async getAccountStatus(): Promise<AccountStatus | null> {
    const user = this.currentUser();

    return user ? user.status : null;
  }

  getCurrentUser(): UserAccount | null {
    return this.currentUser();
  }

  setAuthenticatedUser(user: UserAccount): void {
    this.currentUser.set(user);
  }

  logoutLocal(): void {
    this.currentUser.set(null);
    this.accessTokenSignal.set(null);
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
        `${this.apiUrl}/admin-auth/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(tap(() => this.logoutLocal()));
  }
}
