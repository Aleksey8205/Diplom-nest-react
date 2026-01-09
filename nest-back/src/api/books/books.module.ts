import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { BookController } from './books.controller';
import { BooksService } from './books.service';
import { UsersModule } from '../users/users.module';
import { LibraryModule } from '../library/library.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BooksEntity]),
        LibraryModule,
        UsersModule,
    ],
    controllers: [BookController],
    providers: [BooksService]
})

export class BookModule {}