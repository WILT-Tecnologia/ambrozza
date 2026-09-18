import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DecideApprovalPayload {
  approvalRequestId: string;
  action: 'APPROVE' | 'REJECT';
  reason?: string;
}

export interface ApprovalRequest {
  id: string;
  shopkeeperId: string;
  shopkeeperName: string;
  shopkeeperEmail: string;
  status: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/approval`;

  getPendingRequests(
    page: number,
    limit: number,
    search: string,
  ): Observable<PaginatedResponse<ApprovalRequest>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search) params = params.set('search', search);

    return this.http.get<PaginatedResponse<ApprovalRequest>>(`${this.apiUrl}/pending`, {
      params,
      withCredentials: true,
    });
  }

  decide(payload: DecideApprovalPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/decide`, payload, { withCredentials: true });
  }
}
