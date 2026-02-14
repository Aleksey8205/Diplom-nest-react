import {
  Controller,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseInterceptors,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { BooksService } from '../books.service';
import { BooksEntity } from 'src/entities/books.entity';
import { UpdateBookDTO, CreateBookDTO } from '../DTO/BookDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { JwtGuard } from 'src/guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@Controller('api/admin/books')
export class BookAdminController {
  constructor(private readonly bookService: BooksService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Post('')
  @UseInterceptors(FileInterceptor('coverImage', MulterConfig))
  async createBook(@Body() data: CreateBookDTO, @Req() req) {
    const file = req.file;

    if (file) {
      data.coverImage = `http://localhost:3000/uploads/${file.filename}`;
    }
    return await this.bookService.createBook(data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('coverImage', MulterConfig))
  async updateBook(
    @Param('id') id: number,
    @Body()
    data: UpdateBookDTO,
    @Req()
    req,
  ): Promise<BooksEntity> {
    const file = req.file;
    console.log(data)
    if (file) {
      data.coverImage = `http://localhost:3000/uploads/${file.filename}`;
    }

    return this.bookService.updateBook(id, data);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }
}
