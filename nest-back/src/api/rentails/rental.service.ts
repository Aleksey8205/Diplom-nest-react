import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRentalEntity } from 'src/entities/rental.entity';
import { BooksEntity } from 'src/entities/books.entity';

@Injectable()
export class BookRentalService {
  constructor(
    @InjectRepository(BookRentalEntity)
    private readonly bookRentalRepository: Repository<BookRentalEntity>,
    @InjectRepository(BooksEntity)
    private readonly booksService: Repository<BooksEntity>,
  ) {}

  async createRental(body: BookRentalEntity): Promise<BookRentalEntity> {
    const bookId = body.bookId;

    const book = await this.booksService.findOne({ where: { id: bookId } });

    const newRental = await this.bookRentalRepository.save(body);

    await this.booksService.decrement({ id: bookId }, 'availableCopies', 1);

    return newRental;
  }

  async completeRental(id: number): Promise<void> {
    await this.bookRentalRepository.update(id, { status: 'completed' });
  }

  async findAll(): Promise<BookRentalEntity[]> {
    return await this.bookRentalRepository.find()
  }
}