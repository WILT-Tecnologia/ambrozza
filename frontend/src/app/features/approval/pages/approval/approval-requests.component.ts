import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApprovalRequest, ApprovalService } from '../../services/approval.service';

@Component({
  selector: 'app-approval-requests',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 font-sans">
      <div class="max-w-6xl mx-auto space-y-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Aprovação de Lojistas</h1>
            <p class="text-sm text-slate-500 mt-1">
              Gerencie e analise os pedidos de novos estabelecimentos na plataforma.
            </p>
          </div>
          <div
            class="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {{ requests.length }} Solicitações Pendentes
          </div>
        </div>

        @if (requests.length === 0) {
          <div class="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
            <div
              class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-slate-800">Tudo em dia!</h3>
            <p class="text-sm text-slate-500 mt-1">
              Não há nenhuma solicitação de cadastro pendente no momento.
            </p>
          </div>
        } @else {
          <div class="grid gap-4">
            @for (req of requests; track req.id) {
              <div
                class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all duration-200"
              >
                <div
                  class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
                >
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span
                        class="text-xs font-mono font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200"
                      >
                        ID: {{ req.accountId }}
                      </span>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800"
                      >
                        Pendente
                      </span>
                    </div>
                    <p class="text-xs text-slate-400">
                      Solicitado em:
                      <span class="font-medium text-slate-600">{{
                        req.createdAt | date: 'dd/MM/yyyy - HH:mm'
                      }}</span>
                    </p>
                  </div>

                  <div
                    class="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Motivo (obrigatório para rejeitar)"
                      [(ngModel)]="reasons[req.id]"
                      class="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-64 placeholder:text-slate-400"
                    />

                    <div class="flex items-center gap-2">
                      <button
                        (click)="handleDecide(req.id, 'APPROVE')"
                        class="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm"
                      >
                        Aprovar
                      </button>
                      <button
                        (click)="handleDecide(req.id, 'REJECT')"
                        class="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 hover:border-rose-300 text-sm font-medium rounded-lg transition-colors duration-150"
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class ApprovalRequestsComponent implements OnInit {
  private approvalService = inject(ApprovalService);

  requests: ApprovalRequest[] = [];
  reasons: Record<string, string> = {};

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.approvalService.getPendingRequests().subscribe({
      next: (data) => (this.requests = data),
      error: (err) => console.error('Erro ao carregar solicitações', err),
    });
  }

  handleDecide(approvalRequestId: string, action: 'APPROVE' | 'REJECT'): void {
    const reason = this.reasons[approvalRequestId];

    if (action === 'REJECT' && (!reason || !reason.trim())) {
      alert('O motivo da rejeição é obrigatório.');
      return;
    }

    const payload = {
      approvalRequestId,
      action,
      superAdminId: 'admin-123',
      ...(action === 'REJECT' && { reason }),
    };

    this.approvalService.decide(payload).subscribe({
      next: () => {
        this.requests = this.requests.filter((r) => r.id !== approvalRequestId);
      },
      error: (err) => alert(`Erro: ${err.error?.message || 'Falha ao processar'}`),
    });
  }
}
