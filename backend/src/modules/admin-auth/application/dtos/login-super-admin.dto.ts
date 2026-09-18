import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginSuperUserInputDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}

export class LoginSuperUserOutputDto {
  accessToken!: string;
  refreshToken!: string;

  superUser!: {
    id: string;
    email: string;
  };

  message!: string;
}
