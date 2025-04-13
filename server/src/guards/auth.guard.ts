import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException('Unauthorized ,token not provided');

    try {
      const token = authHeader?.split(' ')[1];
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
      });
      request.user = decoded;
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Invalid or expire token');
    }
  }
}
