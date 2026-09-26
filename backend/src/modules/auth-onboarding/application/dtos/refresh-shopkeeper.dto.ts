import type { LoginShopkeeperOutputDto } from './login-shopkeeper.dto';

export interface RefreshShopkeeperOutputDto {
  accessToken: string;
  shopkeeper: LoginShopkeeperOutputDto['shopkeeper'];
}
