export interface RegisterAccountInputDto {
  name: string;
  email: string;
  password: string;
}

export interface RegisterAccountOutputDto {
  id: string;
  name: string;
  email: string;
  approvalStatus: string;
  message?: string;
}
