import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { APP_PIPE } from '@nestjs/core';
import { BooksService } from './books.service';
import { LibraryModule } from '../library/library.module';
import { ValidationPipe } from './validation/validation.pipe';
import { BookAdminController } from './controllers/books.admin.controller';
import { BookCommonController } from './controllers/books.common.controller';
import { BookManagerController } from './controllers/books.manager.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([BooksEntity]),
       forwardRef(() =>  LibraryModule),
    ],
    controllers: [
        BookAdminController,
        BookCommonController,
        BookManagerController
    ],
    providers: [
        BooksService,
        
        // { provide: APP_PIPE, useClass: ValidationPipe }
    ],
    exports: [BooksService, TypeOrmModule.forFeature([BooksEntity])]
})

export class BookModule {}