import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthLoginDto } from './dto/auth.login.dto';
import { CreateUserDto } from '../user/dto/user.create.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.authService.register(createUserDto, res);
  }

  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    return this.authService.login({
      email: authLoginDto.email,
      password: authLoginDto.password,
      res,
    });
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
