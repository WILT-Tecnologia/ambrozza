import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../core/services/admin-auth.service';
import { ApprovalRequest, ApprovalService } from '../../../../core/services/approval.service';

@Component({
  selector: 'app-approval-requests',
  standalone: true,
  imports: [FormsModule, DatePipe, MatIconModule],
  template: `
    <div class="h-screen flex flex-col overflow-hidden bg-[#F9F5EE] p-6 font-sans">
      <div class="max-w-6xl w-full mx-auto h-full flex flex-col min-h-0 gap-5">
        <div
          class="shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[#76432F]/15"
        >
          <div>
            <h1 class="text-2xl font-semibold text-[#5A331F] tracking-tight">
              Aprovação de Lojistas
            </h1>

            <p class="text-sm text-[#76432F]/70 mt-1">
              @if (!isLoading) {
                {{ total }}
                {{ total === 1 ? 'solicitação pendente' : 'solicitações pendentes' }}

                @if (isSearchActive) {
                  para "{{ appliedSearchTerm }}"
                }
              } @else {
                Carregando solicitações...
              }
            </p>
          </div>

          <button
            type="button"
            (click)="logout()"
            class="inline-flex items-center gap-1.5 px-4 py-2 border border-[#76432F]/30 text-[#76432F] text-sm font-medium rounded-md hover:bg-[#76432F]/5 transition-colors"
          >
            <mat-icon class="icon-sm">logout</mat-icon>
            Sair
          </button>
        </div>

        <div class="shrink-0 flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1 sm:max-w-sm">
            <mat-icon class="icon-sm absolute left-2.5 top-1/2 -translate-y-1/2 text-[#76432F]/40">
              search
            </mat-icon>

            <input
              type="text"
              placeholder="Buscar por nome ou e-mail"
              [(ngModel)]="searchTerm"
              (keyup.enter)="handleSearch()"
              class="w-full text-sm border border-[#76432F]/25 rounded-md pl-9 pr-3 py-2.5 bg-white text-[#3D241A] placeholder:text-[#76432F]/40 outline-none focus:border-[#76432F] focus:ring-1 focus:ring-[#76432F]/40"
            />
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              (click)="handleSearch()"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#76432F] hover:bg-[#5F3625] text-white text-sm font-medium rounded-md transition-colors"
            >
              <mat-icon class="icon-sm">search</mat-icon>
              Buscar
            </button>

            <button
              type="button"
              [disabled]="!isSearchActive"
              (click)="handleClear()"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#76432F]/30 text-[#76432F] text-sm font-medium rounded-md hover:bg-[#76432F]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <mat-icon class="icon-sm">close</mat-icon>
              Limpar
            </button>
          </div>
        </div>

        <div
          class="flex-1 min-h-0 flex flex-col bg-white border border-[#76432F]/12 rounded-md overflow-hidden"
        >
          @if (isLoading) {
            <div class="p-6 space-y-3 overflow-y-auto">
              @for (i of [1, 2, 3, 4, 5]; track i) {
                <div class="h-10 bg-[#76432F]/8 rounded animate-pulse"></div>
              }
            </div>
          } @else {
            @if (requests.length === 0) {
              <div class="flex-1 flex flex-col items-center justify-center text-center p-10">
                <mat-icon class="text-[#76432F]/30 !w-10 !h-10 !text-[40px] mb-2"> inbox </mat-icon>

                <h3 class="text-base font-semibold text-[#5A331F]">Nenhum resultado</h3>

                <p class="text-sm text-[#76432F]/60 mt-1">
                  @if (isSearchActive) {
                    Nenhuma solicitação encontrada para "{{ appliedSearchTerm }}".
                  } @else {
                    Não há solicitações pendentes no momento.
                  }
                </p>
              </div>
            } @else {
              <div class="flex-1 min-h-0 overflow-y-auto">
                <table class="w-full text-sm">
                  <thead
                    class="sticky top-0 z-10 bg-[#F9F5EE] border-b border-[#76432F]/15 text-left text-[#76432F]"
                  >
                    <tr>
                      <th class="px-4 py-3 font-semibold">Lojista</th>
                      <th class="px-4 py-3 font-semibold">Solicitado em</th>
                      <th class="px-4 py-3 font-semibold">Motivo (se rejeitar)</th>
                      <th class="px-4 py-3 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-[#76432F]/8">
                    @for (req of requests; track req.id) {
                      <tr class="hover:bg-[#F9F5EE]/60 transition-colors">
                        <td class="px-4 py-3">
                          <div class="font-medium text-[#3D241A]">
                            {{ req.shopkeeperName }}
                          </div>

                          <div class="text-xs text-[#76432F]/60">
                            {{ req.shopkeeperEmail }}
                          </div>
                        </td>

                        <td class="px-4 py-3 text-[#76432F]/70">
                          {{ req.createdAt | date: 'dd/MM/yyyy HH:mm' }}
                        </td>

                        <td class="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Motivo..."
                            [(ngModel)]="reasons[req.id]"
                            class="text-xs border border-[#76432F]/20 rounded px-2 py-1.5 w-full max-w-xs outline-none focus:border-[#76432F] focus:ring-1 focus:ring-[#76432F]/30"
                          />
                        </td>

                        <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            [disabled]="processingRequests.has(req.id)"
                            (click)="handleDecide(req.id, 'APPROVE')"
                            class="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-md transition-colors min-w-[90px]"
                          >
                            @if (processingRequests.has(req.id)) {
                              <span
                                class="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                              ></span>
                              Processando
                            } @else {
                              <mat-icon class="icon-xs">check</mat-icon>
                              Aprovar
                            }
                          </button>

                          <button
                            type="button"
                            [disabled]="processingRequests.has(req.id)"
                            (click)="handleDecide(req.id, 'REJECT')"
                            class="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#D87D76] hover:bg-[#C96B64] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-md transition-colors min-w-[90px]"
                          >
                            @if (processingRequests.has(req.id)) {
                              <span
                                class="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                              ></span>
                              Processando
                            } @else {
                              <mat-icon class="icon-xs">close</mat-icon>
                              Rejeitar
                            }
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          }
        </div>

        @if (!isLoading && totalPages > 1) {
          <div class="shrink-0 flex items-center justify-between px-1">
            <span class="text-xs text-[#76432F]/70"> Página {{ page }} de {{ totalPages }} </span>

            <div class="flex gap-2">
              <button
                type="button"
                [disabled]="page <= 1"
                (click)="goToPage(page - 1)"
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#76432F]/25 text-[#76432F] rounded-md disabled:opacity-40 hover:bg-[#76432F]/5 transition-colors"
              >
                <mat-icon class="icon-xs">chevron_left</mat-icon>
                Anterior
              </button>

              <button
                type="button"
                [disabled]="page >= totalPages"
                (click)="goToPage(page + 1)"
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#76432F]/25 text-[#76432F] rounded-md disabled:opacity-40 hover:bg-[#76432F]/5 transition-colors"
              >
                Próxima
                <mat-icon class="icon-xs">chevron_right</mat-icon>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .icon-sm {
        width: 18px;
        height: 18px;
        font-size: 18px;
        line-height: 18px;
      }

      .icon-xs {
        width: 14px;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
      }
    `,
  ],
})
export class ApprovalRequestsComponent implements OnInit {
  private approvalService = inject(ApprovalService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  requests: ApprovalRequest[] = [];
  reasons: Record<string, string> = {};
  processingRequests = new Set<string>();

  isLoading = true;

  page = 1;
  limit = 20;
  total = 0;
  totalPages = 0;

  searchTerm = '';
  appliedSearchTerm = '';
  isSearchActive = false;

  ngOnInit(): void {
    this.loadRequests();
  }

  handleSearch(): void {
    const term = this.searchTerm.trim();

    this.appliedSearchTerm = term;
    this.isSearchActive = term.length > 0;
    this.page = 1;

    this.loadRequests();
  }

  handleClear(): void {
    this.searchTerm = '';
    this.appliedSearchTerm = '';
    this.isSearchActive = false;
    this.page = 1;

    this.loadRequests();
  }

  goToPage(newPage: number): void {
    this.page = newPage;
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;

    this.approvalService
      .getPendingRequests(this.page, this.limit, this.appliedSearchTerm)
      .subscribe({
        next: (res) => {
          this.requests = res.data;
          this.total = res.total;
          this.totalPages = res.totalPages;
          this.isLoading = false;

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar solicitações', err);

          this.isLoading = false;

          this.cdr.detectChanges();
        },
      });
  }

  handleDecide(approvalRequestId: string, action: 'APPROVE' | 'REJECT'): void {
    const reason = this.reasons[approvalRequestId];

    if (action === 'REJECT' && (!reason || !reason.trim())) {
      this.showError('O motivo da rejeição é obrigatório.');
      return;
    }

    if (this.processingRequests.has(approvalRequestId)) {
      return;
    }

    this.processingRequests.add(approvalRequestId);

    const payload = {
      approvalRequestId,
      action,
      ...(action === 'REJECT' && {
        reason: reason.trim(),
      }),
    };

    this.approvalService
      .decide(payload)
      .pipe(
        finalize(() => {
          this.processingRequests.delete(approvalRequestId);
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          const message =
            action === 'APPROVE'
              ? 'Solicitação aprovada com sucesso!'
              : 'Solicitação rejeitada com sucesso!';

          this.showSuccess(message);
          this.loadRequests();
        },
        error: (err) => {
          console.error('Erro ao decidir solicitação:', err);

          const message = err.error?.message || 'Não foi possível processar a solicitação.';

          this.showError(message);
        },
      });
  }

  private showSuccess(message: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  private showError(message: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/approval/auth']);
      },
      error: (err) => {
        console.error('Erro ao fazer logout:', err);

        this.authService.logoutLocal();
        this.router.navigate(['/approval/auth']);
      },
    });
  }
}
