import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { BookRentalService } from './rental.service';
import { BookRentalEntity } from 'src/entities/rental.entity';


@Controller('api/rentals')
export class BookRentalController {
  constructor(private readonly bookRentalService: BookRentalService) {}

  @Get()
  async findAll(): Promise<BookRentalEntity[]> {
    return this.bookRentalService.findAll()
  }

  @Post()
  async createRental(@Body() data: any): Promise<BookRentalEntity> {
    return await this.bookRentalService.createRental(data);
  }

  @Patch(':id')
  async completeRental(@Param('id') id: number): Promise<void> {
    return await this.bookRentalService.completeRental(id);
  }
}