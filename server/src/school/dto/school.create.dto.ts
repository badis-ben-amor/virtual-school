import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SchoolCreateDto {
  @IsString()
  @IsNotEmpty()
  school_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  contact_email: string;

  @IsString()
  @IsOptional()
  contact_phone: string;

  @IsString()
  @IsOptional()
  logo_url: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  @IsOptional()
  website_url: string;
}
