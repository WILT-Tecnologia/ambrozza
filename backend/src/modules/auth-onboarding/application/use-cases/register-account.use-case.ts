import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ApprovalRequest } from '../../../approval/domain/entities/approval-request.entity';
import {
  type IApprovalRequestRepository,
  IApprovalRequestRepositoryToken,
} from '../../../approval/domain/repositories/approval-request.repository.interface';
import { Account } from '../../domain/entities/account.entity';
import type { IHashService } from '../../domain/providers/hash.service.interface';
import { IHashServiceToken } from '../../domain/providers/hash.service.interface';

import {
  type IAccountRepository,
  IAccountRepositoryToken,
} from '../../domain/providers/repositories/account.repository.interface';
import type {
  RegisterAccountInputDto,
  RegisterAccountOutputDto,
} from '../dtos/register-account.dto';

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    @Inject(IAccountRepositoryToken)
    private readonly accountRepository: IAccountRepository,
    @Inject(IApprovalRequestRepositoryToken)
    private readonly approvalRequestRepository: IApprovalRequestRepository,
    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,
  ) {}

  async execute(
    input: RegisterAccountInputDto,
  ): Promise<RegisterAccountOutputDto> {
    const existingAccount = await this.accountRepository.findByEmail(
      input.email,
    );
    if (existingAccount) {
      if (existingAccount.approvalStatus === 'PENDING') {
        throw new ConflictException(
          'Ops! Esse endereço de e-mail já tem uma solicitação de criação de conta.',
        );
      }
      throw new Error('E-mail já cadastrado.');
    }

    const passwordHash = await this.hashService.hash(input.password);

    const account = new Account({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const createdAccount = await this.accountRepository.create(account);

    if (!createdAccount.id) {
      throw new Error('Falha ao gerar o ID da conta.');
    }

    const approvalRequest = new ApprovalRequest({
      accountId: createdAccount.id,
    });

    await this.approvalRequestRepository.create(approvalRequest);

    return {
      id: createdAccount.id,
      name: createdAccount.name,
      email: createdAccount.email,
      approvalStatus: createdAccount.approvalStatus,
    };
  }
}
