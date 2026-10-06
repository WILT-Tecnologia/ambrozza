import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OnboardingAuthService } from './onboarding-auth.service';

export interface CreateStoreRequest {
  name: string;
  slug: string;
  description: string;

  document: string;
  phone: string;

  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;

  allowDelivery: boolean;
  allowPickup: boolean;

  colorPalette: string;

  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface CreateStoreResponse {
  id: string;
  name: string;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(OnboardingAuthService);

  private readonly apiUrl = `${environment.apiUrl}/store`;

  createStore(data: CreateStoreRequest): Observable<CreateStoreResponse> {
    const accessToken = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.post<CreateStoreResponse>(this.apiUrl, data, {
      headers,
      withCredentials: true,
    });
  }
}
