import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApprovalRequest {
  id: string;
  accountId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface DecideApprovalPayload {
  approvalRequestId: string;
  action: 'APPROVE' | 'REJECT';
  reason?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/approval`;

  getPendingRequests(): Observable<ApprovalRequest[]> {
    return this.http.get<ApprovalRequest[]>(`${this.apiUrl}/pending`, { withCredentials: true });
  }

  decide(payload: DecideApprovalPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/decide`, payload, { withCredentials: true });
  }
}
