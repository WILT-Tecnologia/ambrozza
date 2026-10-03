import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GetShopBySlugUseCase } from './application/use-cases/get-shop-by-slug.use-case';
import { IShopRepository } from './domain/repositories/shop.repository.interface';
import { GetShopBySlugController } from './infrastructure/controllers/get-shop-by-slug.controller';
import { PrismaShopRepository } from './infrastructure/repositories/prisma-shop.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GetShopBySlugController],
  providers: [
    GetShopBySlugUseCase,
    {
      provide: IShopRepository,
      useClass: PrismaShopRepository,
    },
  ],
  exports: [IShopRepository],
})
export class StoreModule {}
