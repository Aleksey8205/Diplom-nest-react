import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRentalEntity } from 'src/entities/rental.entity';

@Injectable()
export class BookRentalService {
  constructor(
    @InjectRepository(BookRentalEntity)
    private readonly bookRentalRepository: Repository<BookRentalEntity>,
  ) {}

  async createRental(body: BookRentalEntity): Promise<BookRentalEntity> {
    const newRental = this.bookRentalRepository.create(body);
    return await this.bookRentalRepository.save(newRental);
  }

  async completeRental(id: number): Promise<void> {
    await this.bookRentalRepository.update(id, { status: 'completed' });
  }
}