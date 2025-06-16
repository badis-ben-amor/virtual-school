import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  email: string;

  // ccc

  @IsNotEmpty()
  password: string;
}
