/* eslint-disable prettier/prettier */
import { UserRole } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(6)
   @IsOptional()
  password: string;

  @IsString()
   @IsOptional()
  firstName: string;

  @IsString()
   @IsOptional()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  country?: string;
  
  @IsOptional()
  @IsString()
  role?:UserRole
}
