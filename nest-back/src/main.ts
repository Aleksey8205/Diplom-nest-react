import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logger.middleware';

import cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => new LoggingMiddleware().use(req, res, next));
  app.use(cookieParser());

  app.enableCors(
    {
    origin: 'http://localhost:8080', 
    credentials: true,              
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }
  );
  app.use('/uploads', express.static('dist/config/uploads'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
