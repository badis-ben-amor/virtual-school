import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SchoolCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  is_active: boolean;

  @IsString()
  @IsOptional()
  website_url: string;
}
