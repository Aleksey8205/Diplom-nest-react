import { Controller, Param, Get, Query } from '@nestjs/common';
import { BooksService } from '../books.service';
import { BooksEntity } from 'src/entities/books.entity';

@Controller('api/comon/books')
export class BookCommonController {
  constructor(private readonly bookService: BooksService) {}

  @Get('/')
  async findBook(@Query() query: any): Promise<BooksEntity[]> {
    return this.bookService.findBook(query);
  } //обращение через http://localhost:3000/books?интерфейс=значение

  @Get(':id')
  async findBookById(@Param('id') id: number) {
    return await this.bookService.findBookById(id);
  }
}
