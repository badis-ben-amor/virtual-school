import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Callback } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';

const binaryMimeTypes: string[] = [];

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();

    // Use a valid adapter here
    const app = await NestFactory.create(AppModule, );
    const configService = app.get(ConfigService);

    app.enableCors({
      origin: configService.get('CLIENT_URL'),
      credentials: true,
    });
    app.use(cookieParser());

    await app.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export async function handler(event: any, context: any, callback: Callback) {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
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
