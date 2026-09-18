export interface LoginShopkeeperInputDto {
  email: string;
  password: string;
}

export interface LoginShopkeeperOutputDto {
  accessToken: string;
  shopkeeper: {
    id: string;
    name: string;
    email: string;
  };
}
