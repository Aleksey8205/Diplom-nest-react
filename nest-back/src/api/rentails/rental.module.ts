import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRentalController } from './rental.controller';
import { BookRentalService } from './rental.service';
import { BookRentalEntity } from 'src/entities/rental.entity';
import { BookModule } from '../books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRentalEntity]),
    BookModule, 
  ],
  controllers: [BookRentalController],
  providers: [BookRentalService], 
})
export class BookRentalModule {}