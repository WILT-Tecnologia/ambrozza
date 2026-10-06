export interface RegisterShopkeeperInputDto {
  name: string;
  email: string;
  password: string;
}

export interface RegisterShopkeeperOutputDto {
  id: string;
  name: string;
  email: string;
  approvalStatus: string;
  message?: string;
}
export interface RegisterShopkeeperRequestDto extends RegisterShopkeeperInputDto {
  confirmPassword: string;
}
