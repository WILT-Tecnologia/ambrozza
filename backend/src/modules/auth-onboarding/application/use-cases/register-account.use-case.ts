import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ApprovalRequest } from '../../../approval/domain/entities/approval-request.entity';
import { Account } from '../../domain/entities/account.entity';
import type { IHashService } from '../../domain/providers/hash.service.interface';
import { IHashServiceToken } from '../../domain/providers/hash.service.interface';

import {
  type IAccountRepository,
  IAccountRepositoryToken,
} from '../../domain/providers/repositories/account.repository.interface';

import {
  type IUnitOfWork,
  IUnitOfWorkToken,
} from '../../infrastructure/repositories/unit-of-work.interface';
import type {
  RegisterAccountInputDto,
  RegisterAccountOutputDto,
} from '../dtos/register-account.dto';

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    @Inject(IAccountRepositoryToken)
    private readonly accountRepository: IAccountRepository,
    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,
    @Inject(IUnitOfWorkToken)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(
    input: RegisterAccountInputDto,
  ): Promise<RegisterAccountOutputDto> {
    const email = input.email.trim().toLowerCase();
    const existingAccount = await this.accountRepository.findByEmail(email);
    if (existingAccount) {
      if (existingAccount.approvalStatus === 'PENDING') {
        throw new ConflictException(
          'Ops! Esse endereço de e-mail já tem uma solicitação de criação de conta.',
        );
      }
      throw new ConflictException(
        'Este endereço de e-mail já está cadastrado.',
      );
    }

    const passwordHash = await this.hashService.hash(input.password);

    const account = new Account({
      name: input.name,
      email,
      passwordHash,
    });

    const result = await this.unitOfWork.execute(
      async (accountRepository, approvalRequestRepository) => {
        const createdAccount = await accountRepository.create(account);

        if (!createdAccount.id) {
          throw new Error('Falha ao gerar o ID da conta.');
        }

        const approvalRequest = new ApprovalRequest({
          accountId: createdAccount.id,
        });

        await approvalRequestRepository.create(approvalRequest);

        return {
          message:
            'Solicitação de criação de conta enviada com sucesso! Aguarde a aprovação.',
        };
      },
    );

    return result;
  }
}
