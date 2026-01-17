import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { APP_PIPE } from '@nestjs/core';
import { BookController } from './books.controller';
import { BooksService } from './books.service';
import { UsersModule } from '../users/users.module';
import { LibraryModule } from '../library/library.module';
import { ValidationPipe } from './validation/validation.pipe';

@Module({
    imports: [
        TypeOrmModule.forFeature([BooksEntity]),
        LibraryModule,
        UsersModule,
    ],
    controllers: [BookController],
    providers: [
        BooksService,
        
        // { provide: APP_PIPE, useClass: ValidationPipe }
    ],
    exports: [BooksService, TypeOrmModule.forFeature([BooksEntity])]
})

export class BookModule {}