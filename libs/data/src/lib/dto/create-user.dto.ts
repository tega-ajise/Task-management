import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Organizations } from '../enums/app.enums';

export class CreateUserDto {
  @IsNotEmpty()
  displayName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  @IsEnum(Organizations)
  organization!: Organizations;

  @IsOptional()
  role?: string;
}
