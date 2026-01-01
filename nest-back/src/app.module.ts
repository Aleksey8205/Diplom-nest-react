import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { LibraryModule } from './api/library/library.module';
import { AuthModule } from './api/authentificate/auth.module';
import { BookModule } from './api/books/books.module';
import { BookRentalModule } from './api/rentails/rentail.module';

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
    AuthModule,
    UsersModule,
    LibraryModule,
    BookModule,
    BookRentalModule,
  ],
})
export class AppModule {
}