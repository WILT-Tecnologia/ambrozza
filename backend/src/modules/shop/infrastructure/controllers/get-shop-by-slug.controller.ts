import { Controller, Get, Param } from '@nestjs/common';
import { GetShopBySlugUseCase } from '../../application/use-cases/get-shop-by-slug.use-case';
import { ShopResponseHttpDto } from './dtos/shop-response-http.dto';

@Controller('loja')
export class GetShopBySlugController {
  constructor(private readonly getShopBySlugUseCase: GetShopBySlugUseCase) {}

  @Get(':slug')
  async execute(@Param('slug') slug: string): Promise<ShopResponseHttpDto> {
    const shop = await this.getShopBySlugUseCase.execute(slug);

    return {
      name: shop.name,
      slug: shop.slug,
      colorPalette: shop.colorPalette,
    };
  }
}
