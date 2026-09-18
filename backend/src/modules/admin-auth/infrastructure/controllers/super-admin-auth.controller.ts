import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { LoginSuperUserInputDto } from '../../application/dtos/login-super-admin.dto';
import { LoginSuperUserUseCase } from '../../application/use-cases/login-super-admin.use-case';
import { RefreshSuperUserTokenUseCase } from '../../application/use-cases/refresh-super-admin.use-case';
@Controller('admin-auth')
export class SuperAdminAuthController {
  constructor(
    private readonly loginSuperUserUseCase: LoginSuperUserUseCase,
    private readonly refreshSuperUserTokenUseCase: RefreshSuperUserTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginSuperUserInputDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, superUser } =
      await this.loginSuperUserUseCase.execute(body);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      superUser,
    };
  }
  @SkipThrottle()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshSuperUserTokenUseCase.execute({ refreshToken });

    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  }
}
