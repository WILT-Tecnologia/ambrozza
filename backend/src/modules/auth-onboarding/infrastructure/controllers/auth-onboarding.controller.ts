import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { RegisterShopkeeperUseCase } from '../../application/use-cases/register-shopkeeper.use-case';
import { RegisterShopkeeperHttpDto } from './dtos/register-shopkeeper-http.dto';

import { LoginShopkeeperUseCase } from '../../application/use-cases/login-shopkeeper.use-case';
import { RefreshShopkeeperTokenUseCase } from '../../application/use-cases/refresh-shopkeeper-token.use-case';
import { LoginShopkeeperHttpDto } from './dtos/login-shopkeeper-http.dto';

const REFRESH_COOKIE_NAME = 'shopkeeperRefreshToken';
const REFRESH_COOKIE_PATH = '/auth-onboarding/refresh';

@Controller('auth-onboarding')
export class AuthOnboardingController {
  constructor(
    private readonly registerAccountUseCase: RegisterShopkeeperUseCase,
    private readonly loginShopkeeperUseCase: LoginShopkeeperUseCase,
    private readonly refreshShopkeeperTokenUseCase: RefreshShopkeeperTokenUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterShopkeeperHttpDto) {
    const { confirmPassword, ...registerInput } = dto;
    const result = await this.registerAccountUseCase.execute(registerInput);

    return {
      ...result,
      message:
        'Solicitação de criação de conta enviada com sucesso! Aguarde a aprovação.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginShopkeeperHttpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginShopkeeperUseCase.execute(dto);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
      shopkeeper: result.shopkeeper,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request) {
    const refreshToken = request.cookies?.[REFRESH_COOKIE_NAME];
    return this.refreshShopkeeperTokenUseCase.execute(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_COOKIE_PATH });
    return { message: 'Logout realizado com sucesso.' };
  }

  private setRefreshCookie(response: Response, refreshToken: string): void {
    response.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: REFRESH_COOKIE_PATH,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
