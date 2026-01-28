import {
  Controller,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseInterceptors,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from 'src/entities/books.entity';
import { UpdateBookDTO, CreateBookDTO } from './DTO/BookDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { JwtGuard } from 'src/guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Get('/')
  async findBook(@Query() query: any): Promise<BooksEntity[]> {
    return this.bookService.findBook(query);
  } //обращение через http://localhost:3000/books?интерфейс=значение


  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post()
  @UseInterceptors(FileInterceptor('coverImage', MulterConfig))
  async createBook(@Body() data: CreateBookDTO, @Req() req) {
    const file = req.file;

    if (file) {
      data.coverImage = `http://localhost:3000/uploads/${file.filename}`;
    }
    return await this.bookService.createBook(data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Put(':id')
  @UseInterceptors(FileInterceptor('coverImage', MulterConfig))
  async updateBook(
    @Param('id') id: number,
    @Body()
    @Req()
    req,
    data: UpdateBookDTO,
  ): Promise<BooksEntity> {
    const file = req.file;

    if (file) {
      data.coverImage = `http://localhost:3000/uploads/${file.filename}`;
    }

    return this.bookService.updateBook(id, data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Get(':id')
  async findBookById(@Param('id') id: number) {
    return await this.bookService.findBookById(id);
  }
}
