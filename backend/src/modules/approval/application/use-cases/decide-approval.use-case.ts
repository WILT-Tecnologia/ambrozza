import { Inject, Injectable } from '@nestjs/common';

import {
  type IAccountRepository,
  IAccountRepositoryToken,
} from 'src/modules/auth-onboarding/domain/providers/repositories/account.repository.interface';
import {
  type IApprovalRequestRepository,
  IApprovalRequestRepositoryToken,
} from '../../domain/repositories/approval-request.repository.interface';
import type {
  DecideApprovalInputDto,
  DecideApprovalOutputDto,
} from '../dtos/decide-approval.dto';

@Injectable()
export class DecideApprovalUseCase {
  constructor(
    @Inject(IApprovalRequestRepositoryToken)
    private readonly approvalRequestRepository: IApprovalRequestRepository,
    @Inject(IAccountRepositoryToken)
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(
    input: DecideApprovalInputDto,
  ): Promise<DecideApprovalOutputDto> {
    const request = await this.approvalRequestRepository.findById(
      input.approvalRequestId,
    );
    if (!request) {
      throw new Error('Solicitação de aprovação não encontrada.');
    }

    if (input.action === 'APPROVE') {
      request.approve(input.superAdminId);
    } else {
      if (!input.reason) {
        throw new Error('Motivo é obrigatório para rejeição.');
      }
      request.reject(input.superAdminId, input.reason);
    }

    await this.approvalRequestRepository.save(request);
    await this.accountRepository.updateApprovalStatus(
      request.accountId,
      request.status,
    );

    return {
      approvalRequestId: request.id!,
      accountId: request.accountId,
      status: request.status,
      decidedAt: request.decidedAt!,
    };
  }
}
