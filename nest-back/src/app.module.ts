import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { LibraryModule } from './api/library/library.module';
import { BookModule } from './api/books/books.module';
import { BookRentalModule } from './api/rentails/rentail.module';
import { GuardModule } from './guards/jwt.auth.guard.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: 'AqRT82056',
      database: 'mydb',
      synchronize: true,
      logging: false,
      entities: ['dist/**/*.entity.js'],
    }),
    GuardModule,
    UsersModule,
    LibraryModule,
    BookModule,
    BookRentalModule,
  ],
})
export class AppModule {
}