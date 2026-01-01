import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksEntity } from '../../entities/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
  ) {}

  async createBook(data: {
    libraryId: number;
    title: string;
    author: string;
    year: number;
    description: string;
    coverImage: string;
    isAvailable: boolean;
  }): Promise<BooksEntity> {
    const newBook = this.booksRepository.create(data);
    return await this.booksRepository.save(newBook);
  }

  async updateBook(
    id: number,
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
    const book = await this.booksRepository.findOneByOrFail({ id });
    Object.assign(book, data);
    return await this.booksRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    await this.booksRepository.delete(id)
  }
}
