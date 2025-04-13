import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user) throw new BadRequestException('User already exist');

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      const accessToken = this.jwtService.sign(
        { id: newUser.id, isAdmin: newUser.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );
      const refreshToken = this.jwtService.sign(
        {
          id: newUser.id,
          isAdmin: newUser.isAdmin,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV'),
        sameSite: 'strict',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          60 *
          60 *
          1000,
      });

      return res.status(HttpStatus.CREATED).json({ accessToken });
    } catch (error) {
      throw new InternalServerErrorException('Register failed');
    }
  }

  async login({
    email,
    password,
    res,
  }: {
    email: string;
    password: string;
    res: Response;
  }): Promise<Response> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword)
        throw new UnauthorizedException('Invalid credentials');

      const accessToken = this.jwtService.sign(
        { id: user.id, isAdmin: user.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: user.id, isAdmin: user.isAdmin },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'strict',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          60 *
          60 *
          1000,
      });

      return res.status(HttpStatus.OK).json({ accessToken });
    } catch (error) {
      throw new InternalServerErrorException('Login failed');
    }
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new UnauthorizedException('Not token provided');

      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
      });

      const newAccessToken = this.jwtService.sign(
        { id: payload.id, isAdmin: payload.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );

      return res.status(HttpStatus.OK).json({ newAccessToken });
    } catch (error) {
      throw new UnauthorizedException('Invalide refresh token');
    }
  }

  async logout(res: Response): Promise<Response> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'strict',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          606 *
          60 *
          1000,
      });
      return res.status(HttpStatus.OK).json({ message: 'Logout success' });
    } catch (error) {
      throw new InternalServerErrorException('Logout failed');
    }
  }
}
