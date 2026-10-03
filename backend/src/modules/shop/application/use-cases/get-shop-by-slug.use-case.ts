import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Shop } from '../../domain/entities/shop.entity';
import { IShopRepository } from '../../domain/repositories/shop.repository.interface';

@Injectable()
export class GetShopBySlugUseCase {
  constructor(
    @Inject(IShopRepository)
    private readonly shopRepository: IShopRepository,
  ) {}

  async execute(slug: string): Promise<Shop> {
    const normalizedSlug = slug.trim().toLowerCase();

    const shop = await this.shopRepository.findBySlug(normalizedSlug);

    if (!shop) {
      throw new NotFoundException('Loja não encontrada.');
    }

    return shop;
  }
}
