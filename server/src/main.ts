import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
      origin: configService.get('CLIENT_URL'),
      credentials: true,
    });
    app.use(cookieParser());

    await app.init();
    cachedServer = expressApp; // Directly use the express app
  }
  return cachedServer;
}

export default async function handler(req, res) {
  const server = await bootstrapServer();
  server(req, res); // Invoke the express server with the request/response
}

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const configService = app.get(ConfigService);

//   app.enableCors({
//     origin: configService.get('CLIENT_URL'),
//     credentials: true,
//   });
//   app.use(cookieParser());

//   await app.listen(process.env.PORT ?? 5000);
// }
// bootstrap();
