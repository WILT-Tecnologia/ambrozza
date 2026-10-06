import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Shop } from '../../domain/entities/shop.entity';
import { IShopRepository } from '../../domain/repositories/shop.repository.interface';

@Injectable()
export class PrismaShopRepository implements IShopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Shop | null> {
    const shop = await this.prisma.store.findUnique({
      where: { id },
    });

    return shop ? this.toDomain(shop) : null;
  }

  async findBySlug(slug: string): Promise<Shop | null> {
    const shop = await this.prisma.store.findUnique({
      where: { slug },
    });

    return shop ? this.toDomain(shop) : null;
  }

  async findByShopkeeperId(shopkeeperId: string): Promise<Shop[]> {
    const shops = await this.prisma.store.findMany({
      where: { shopkeeperId },
    });

    return shops.map((shop) => this.toDomain(shop));
  }

  async findByName(name: string): Promise<Shop | null> {
    const shop = await this.prisma.store.findUnique({
      where: { name },
    });

    return shop ? this.toDomain(shop) : null;
  }

  private toDomain(shop: {
    id: string;
    name: string;
    slug: string;
    description: string;
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string | null;
    allowDelivery: boolean;
    allowPickup: boolean;
    colorPalette: string;
    shopkeeperId: string;
    createdAt: Date;
    updatedAt: Date;
  }): Shop {
    return new Shop({
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      description: shop.description,
      cep: shop.cep,
      state: shop.state,
      city: shop.city,
      street: shop.street,
      number: shop.number,
      neighborhood: shop.neighborhood,
      complement: shop.complement ?? undefined,
      allowDelivery: shop.allowDelivery,
      allowPickup: shop.allowPickup,
      colorPalette: shop.colorPalette,
      shopkeeperId: shop.shopkeeperId,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    });
  }
}
