import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  IUnitOfWork,
  IUnitOfWorkToken,
} from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import {
  DecideApprovalInputDto,
  DecideApprovalOutputDto,
} from '../dtos/decide-approval.dto';

@Injectable()
export class DecideApprovalUseCase {
  constructor(
    @Inject(IUnitOfWorkToken)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(
    input: DecideApprovalInputDto,
    superAdminId: string,
  ): Promise<DecideApprovalOutputDto> {
    return this.unitOfWork.execute(
      async (accountRepository, approvalRequestRepository) => {
        const request = await approvalRequestRepository.findById(
          input.approvalRequestId,
        );

        if (!request) {
          throw new Error('Solicitação de aprovação não encontrada.');
        }

        if (input.action === 'APPROVE') {
          request.approve(superAdminId);
        } else {
          if (!input.reason || !input.reason.trim()) {
            throw new Error('Motivo é obrigatório para rejeição.');
          }

          request.reject(superAdminId, input.reason.trim());
        }

        const saved = await approvalRequestRepository.save(request);

        if (!saved) {
          throw new ConflictException(
            'Esta solicitação já foi processada por outro administrador.',
          );
        }

        await accountRepository.updateApprovalStatus(
          request.shopkeeperId,
          request.status,
        );

        return {
          approvalRequestId: request.id!,
          accountId: request.shopkeeperId,
          status: request.status,
          decidedAt: request.decidedAt!,
        };
      },
    );
  }
}
