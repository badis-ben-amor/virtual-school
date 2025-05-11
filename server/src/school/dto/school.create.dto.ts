import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SchoolCreateDto {
  @IsNotEmpty()
  @IsString()
  school_name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  contact_email: string;

  @IsString()
  contact_phone: string;

  @IsString()
  logo_url: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  website_url: string;
}
