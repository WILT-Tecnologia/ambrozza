import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateStoreUseCase } from '../../application/use-cases/create-store.use-case';

import { JwtShopkeeperAuthGuard } from '../guards/jwt-shopkeeper-auth.guard';
import { AuthenticatedShopkeeperRequest } from './authenticated-shopkeeper-request';
import { CreateStoreHttpDto } from './dtos/create-store-http.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly createStoreUseCase: CreateStoreUseCase) {}

  @Post()
  @UseGuards(JwtShopkeeperAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateStoreHttpDto,
    @Req() request: AuthenticatedShopkeeperRequest,
  ) {
    return this.createStoreUseCase.execute(dto, request.user.sub);
  }
}
