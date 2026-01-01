import { Controller, Post, Delete, Put, Body, Param, } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from 'src/entities/books.entity';
import { saveFile } from '../../middleware/file-uploader'

@Controller('api/admin/books')
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async createBook(
    @Body()
    data: {
      libraryId: number;
      title: string;
      author: string;
      year: number;
      description: string;
      coverImage: string;
      isAvailable: boolean;
    },
  ) {
    return await this.bookService.createBook(data);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body()
    data: {
      libraryId?: number;
      title?: string;
      author?: string;
      year?: number;
      description?: string;
      coverImage?: string;
      isAvailable?: boolean;
    },
  ): Promise<BooksEntity> {
    return this.bookService.updateBook(id, data);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }
}
