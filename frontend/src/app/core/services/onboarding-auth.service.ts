import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  VerifyResetCodeRequestDto,
  VerifyResetCodeResponseDto,
} from '../../features/onboarding/authentication/dtos/forgot-password.dto';
import {
  LoginShopkeeperInputDto,
  LoginShopkeeperOutputDto,
} from '../../features/onboarding/authentication/dtos/login-shopkeeper.dto';
import {
  RegisterShopkeeperOutputDto,
  RegisterShopkeeperRequestDto,
} from '../../features/onboarding/authentication/dtos/register-shopkeeper.dto';
export interface RefreshShopkeeperResponse {
  accessToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class OnboardingAuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth-onboarding`;
  private refreshPromise: Promise<boolean> | null = null;
  private accessToken: string | null = null;
  private currentShopkeeper: LoginShopkeeperOutputDto['shopkeeper'] | null = null;

  register(dto: RegisterShopkeeperRequestDto): Observable<RegisterShopkeeperOutputDto> {
    return this.http.post<RegisterShopkeeperOutputDto>(`${this.apiUrl}/register`, dto);
  }
  login(dto: LoginShopkeeperInputDto): Observable<LoginShopkeeperOutputDto> {
    return this.http
      .post<LoginShopkeeperOutputDto>(`${this.apiUrl}/login`, dto, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.setAccessToken(response.accessToken);
          this.currentShopkeeper = response.shopkeeper;
        }),
      );
  }

  refresh(): Observable<RefreshShopkeeperResponse> {
    return this.http.post<RefreshShopkeeperResponse>(
      `${this.apiUrl}/refresh`,
      {},
      { withCredentials: true },
    );
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.accessToken !== null) {
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
      .catch(() => false)
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.logoutLocal()));
  }

  resendResetCode(dto: ForgotPasswordRequestDto): Observable<ForgotPasswordResponseDto> {
    return this.http.post<ForgotPasswordResponseDto>(`${this.apiUrl}/resend-reset-code`, dto);
  }

  forgotPassword(dto: ForgotPasswordRequestDto): Observable<ForgotPasswordResponseDto> {
    return this.http.post<ForgotPasswordResponseDto>(`${this.apiUrl}/forgot-password`, dto);
  }

  verifyResetCode(dto: VerifyResetCodeRequestDto): Observable<VerifyResetCodeResponseDto> {
    return this.http.post<VerifyResetCodeResponseDto>(`${this.apiUrl}/verify-reset-code`, dto);
  }

  resetPassword(dto: ResetPasswordRequestDto): Observable<ResetPasswordResponseDto> {
    return this.http.post<ResetPasswordResponseDto>(`${this.apiUrl}/reset-password`, dto);
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }

  getCurrentShopkeeper(): LoginShopkeeperOutputDto['shopkeeper'] | null {
    return this.currentShopkeeper;
  }

  logoutLocal(): void {
    this.accessToken = null;
    this.currentShopkeeper = null;
  }
}
