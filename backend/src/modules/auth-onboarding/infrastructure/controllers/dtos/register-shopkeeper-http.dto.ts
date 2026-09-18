import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RegisterShopkeeperInputDto } from '../../../application/dtos/register-shopkeeper.dto';

export class RegisterShopkeeperHttpDto implements RegisterShopkeeperInputDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(72)
  password!: string;
}
