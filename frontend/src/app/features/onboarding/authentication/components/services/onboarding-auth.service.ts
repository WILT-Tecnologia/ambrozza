import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { RegisterAccountInputDto, RegisterAccountOutputDto } from '../../dtos/register-account.dto';

@Injectable({
  providedIn: 'root',
})
export class OnboardingAuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth-onboarding`;

  private accessToken: string | null = null;

  register(dto: RegisterAccountInputDto): Observable<RegisterAccountOutputDto> {
    return this.http.post<RegisterAccountOutputDto>(`${this.apiUrl}/register`, dto);
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
}
