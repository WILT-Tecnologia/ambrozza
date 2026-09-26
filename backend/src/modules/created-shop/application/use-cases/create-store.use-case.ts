import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Store } from '../../domain/entities/store.entity';

import {
  IUnitOfWork,
  IUnitOfWorkToken,
} from 'src/shared/infrastructure/database/unit-of-work/unit-of-work.interface';
import type {
  CreateStoreInputDto,
  CreateStoreOutputDto,
} from '../dtos/create-store.dto';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    @Inject(IUnitOfWorkToken)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(
    input: CreateStoreInputDto,
    shopkeeperId: string,
  ): Promise<CreateStoreOutputDto> {
    return this.unitOfWork.execute(
      async (
        shopkeeperRepository,
        _approvalRequestRepository,
        storeRepository,
        storeOnboardingConsentRepository,
      ) => {
        const shopkeeper = await shopkeeperRepository.findById(shopkeeperId);

        if (!shopkeeper) {
          throw new NotFoundException('Lojista não encontrado.');
        }

        if (!shopkeeper.isApproved()) {
          throw new ForbiddenException(
            'O lojista não está autorizado a criar uma loja.',
          );
        }

        const normalizedName = input.name.trim();
        const nameOnlyNumbersRegex = /^\d+$/;

        if (nameOnlyNumbersRegex.test(normalizedName)) {
          throw new ConflictException(
            'O nome da loja não pode conter apenas números.',
          );
        }

        const normalizedSlug = input.slug.trim().toLowerCase();
        const existingName = await storeRepository.findByName(normalizedName);

        if (existingName) {
          throw new ConflictException(
            'Este nome de loja já está sendo utilizado.',
          );
        }

        const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;

        if (!slugRegex.test(normalizedSlug)) {
          throw new ConflictException(
            'O slug deve conter apenas letras minúsculas e hífens para substituir espaços, sem números ou caracteres especiais.',
          );
        }

        const existingSlug = await storeRepository.findBySlug(normalizedSlug);

        if (existingSlug) {
          throw new ConflictException(
            'Este Link exclusivo já está sendo utilizado por outra loja.',
          );
        }

        if (!input.acceptTerms || !input.acceptPrivacy) {
          throw new ConflictException(
            'É necessário aceitar os termos de uso e a política de privacidade.',
          );
        }

        if (!input.allowDelivery && !input.allowPickup) {
          throw new ConflictException(
            'A loja deve disponibilizar pelo menos uma modalidade de atendimento.',
          );
        }

        await shopkeeperRepository.updateOnboardingData(shopkeeperId, {
          document: input.document,
          phone: input.phone,
        });

        const store = new Store({
          name: normalizedName,
          slug: normalizedSlug,
          description: input.description,
          cep: input.cep,
          state: input.state,
          city: input.city,
          street: input.street,
          number: input.number,
          neighborhood: input.neighborhood,
          complement: input.complement,
          allowDelivery: input.allowDelivery,
          allowPickup: input.allowPickup,
          colorPalette: input.colorPalette,
          shopkeeperId,
        });

        const createdStore = await storeRepository.create(store);

        if (!createdStore.id) {
          throw new Error('Falha ao gerar o ID da loja.');
        }

        await storeOnboardingConsentRepository.create({
          storeId: createdStore.id,
          termsAccepted: input.acceptTerms,
          privacyAccepted: input.acceptPrivacy,
        });

        return {
          id: createdStore.id,
          name: createdStore.name,
          slug: createdStore.slug,
        };
      },
    );
  }
}
