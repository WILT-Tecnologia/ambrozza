import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma, Store as PrismaStoreModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Store } from '../../domain/entities/created-store.entity';
import { IStoreRepository } from '../../domain/repositories/store.repository.interface';

@Injectable()
export class PrismaStoreRepository implements IStoreRepository {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService | Prisma.TransactionClient,
  ) {}

  async findById(id: string): Promise<Store | null> {
    const record = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async findBySlug(slug: string): Promise<Store | null> {
    const record = await this.prisma.store.findUnique({
      where: { slug },
    });

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async findByShopkeeperId(shopkeeperId: string): Promise<Store[]> {
    const records = await this.prisma.store.findMany({
      where: { shopkeeperId },
    });

    return records.map((record) => this.mapToDomain(record));
  }

  async findByName(name: string): Promise<Store | null> {
    const record = await this.prisma.store.findFirst({
      where: {
        name: name.trim(),
      },
    });

    if (!record) {
      return null;
    }

    return this.mapToDomain(record);
  }

  async create(store: Store): Promise<Store> {
    try {
      const record = await this.prisma.store.create({
        data: {
          name: store.name,
          slug: store.slug,
          description: store.description,
          cep: store.cep,
          state: store.state,
          city: store.city,
          street: store.street,
          number: store.number,
          neighborhood: store.neighborhood,
          complement: store.complement,
          allowDelivery: store.allowDelivery,
          allowPickup: store.allowPickup,
          colorPalette: store.colorPalette,
          shopkeeperId: store.shopkeeperId,
        },
      });

      return this.mapToDomain(record);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Não foi possível criar a loja porque um dos dados informados já está em uso.',
        );
      }

      throw error;
    }
  }

  private mapToDomain(record: PrismaStoreModel): Store {
    return new Store({
      id: record.id,
      name: record.name,
      slug: record.slug,
      description: record.description,
      cep: record.cep,
      state: record.state,
      city: record.city,
      street: record.street,
      number: record.number,
      neighborhood: record.neighborhood,
      complement: record.complement ?? undefined,
      allowDelivery: record.allowDelivery,
      allowPickup: record.allowPickup,
      colorPalette: record.colorPalette,
      shopkeeperId: record.shopkeeperId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
