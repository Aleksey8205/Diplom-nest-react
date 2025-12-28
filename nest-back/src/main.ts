import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logger.middleware';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => new LoggingMiddleware().use(req, res, next));
  app.use(session({
    secret: 'super-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
