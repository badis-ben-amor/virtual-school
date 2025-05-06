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
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { CreateUserDto } from '../user/dto/user.create.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) throw new BadRequestException('User already exist');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.sign(
      { id: newUser.id },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: newUser.id,
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
  }

  async login({
    email,
    password,
    res,
  }: {
    email: string;
    password: string;
    res: Response;
  }) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id },
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
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new UnauthorizedException('Not token provided');

    try {
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
