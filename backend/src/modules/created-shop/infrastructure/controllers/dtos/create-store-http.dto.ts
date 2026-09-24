import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStoreHttpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  @MaxLength(250)
  description!: string;

  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(9)
  cep!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  state!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  neighborhood!: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  complement?: string;

  @IsBoolean()
  allowDelivery!: boolean;

  @IsBoolean()
  allowPickup!: boolean;

  @IsString()
  @IsNotEmpty()
  colorPalette!: string;

  @IsBoolean()
  acceptTerms!: boolean;

  @IsBoolean()
  acceptPrivacy!: boolean;
}
