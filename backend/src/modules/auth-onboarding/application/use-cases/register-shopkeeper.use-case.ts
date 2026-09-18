import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ApprovalRequest } from '../../../approval-superAdmin/domain/entities/administration-request.entity';
import { Shopkeeper } from '../../domain/entities/shopkeeper.entity';
import type { IHashService } from '../../domain/providers/interface/hash.service.interface';
import { IHashServiceToken } from '../../domain/providers/interface/hash.service.interface';

import {
  type IShopkeeperRepository,
  IShopkeeperRepositoryToken,
} from '../../domain/providers/repositories/shopkeeper.repository.interface';

import {
  IUnitOfWork,
  IUnitOfWorkToken,
} from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import type {
  RegisterShopkeeperInputDto,
  RegisterShopkeeperOutputDto,
} from '../dtos/register-shopkeeper.dto';

@Injectable()
export class RegisterShopkeeperUseCase {
  constructor(
    @Inject(IShopkeeperRepositoryToken)
    private readonly shopkeeperRepository: IShopkeeperRepository,
    @Inject(IHashServiceToken)
    private readonly hashService: IHashService,
    @Inject(IUnitOfWorkToken)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(
    input: RegisterShopkeeperInputDto,
  ): Promise<RegisterShopkeeperOutputDto> {
    const email = input.email.trim().toLowerCase();
    const existingShopkeeper =
      await this.shopkeeperRepository.findByEmail(email);

    if (existingShopkeeper) {
      if (
        existingShopkeeper.isRejected() === false &&
        !existingShopkeeper.isApproved()
      ) {
        throw new ConflictException(
          'Ops! Esse endereço de e-mail já tem uma solicitação de cadastro pendente.',
        );
      }
      throw new ConflictException(
        'Este endereço de e-mail já está cadastrado.',
      );
    }

    const passwordHash = await this.hashService.hash(input.password);

    const shopkeeper = new Shopkeeper({
      name: input.name,
      email,
      passwordHash,
    });

    const result = await this.unitOfWork.execute(
      async (shopkeeperRepository, approvalRequestRepository) => {
        const createdShopkeeper = await shopkeeperRepository.create(shopkeeper);

        if (!createdShopkeeper.id) {
          throw new Error('Falha ao gerar o ID do lojista.');
        }

        const approvalRequest = new ApprovalRequest({
          shopkeeperId: createdShopkeeper.id,
        });

        await approvalRequestRepository.create(approvalRequest);

        return {
          message:
            'Solicitação de cadastro enviada com sucesso! Aguarde a aprovação.',
        };
      },
    );

    return result;
  }
}
