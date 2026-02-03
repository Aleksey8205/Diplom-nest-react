import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { LibraryModule } from './api/library/library.module';
import { BookModule } from './api/books/books.module';
import { BookRentalModule } from './api/rentails/rental.module';
import { GuardModule } from './guards/jwt.auth.guard.module';
import { SupportRequestModule } from './api/chat/support.module';
import  dotenv from 'dotenv';
import { GlobalExceptionFilter } from './middleware/httpExceprion';
import { APP_FILTER } from '@nestjs/core';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: 5432, 
      username: process.env.TYPEORM_USERNAME ,
      password: process.env.TYPEORM_PASSWORD ,
      database: process.env.TYPEORM_DATABASE ,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING !== 'false',
      entities: ['dist/**/*.entity.js'],
    }),
    GuardModule,
    UsersModule,
    BookModule,
    LibraryModule,
    BookRentalModule,
    SupportRequestModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }]
})
export class AppModule {
}