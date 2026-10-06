import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShopHomeResponse } from '../models/shop/shop-home-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private readonly http = inject(HttpClient);

  getHome(slug: string): Observable<ShopHomeResponse> {
    return this.http.get<ShopHomeResponse>(
      `${environment.apiUrl}/loja/${encodeURIComponent(slug)}`,
    );
  }
}
