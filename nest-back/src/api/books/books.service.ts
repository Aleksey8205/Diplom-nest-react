import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';

import { BooksEntity } from '../../entities/books.entity';
import { LibraryEntity } from 'src/entities/library.entity';

import { FindBooksParams } from './Interfaces/findBooks';



@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    @InjectRepository(LibraryEntity)
    private readonly libraryRepository: Repository<LibraryEntity>,
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

  async findBook(params: FindBooksParams) {
    let whereConditions = {};
  
    if (params.library) {
      whereConditions['library.id'] = Number(params.library); 
    }
  
    if (params.author) {
      whereConditions['author'] = Like(`%${params.author}%`);
    }
  
    if (params.title) {
      whereConditions['title'] = Like(`%${params.title}%`);
    }
  
    if (params.availableOnly) {
      whereConditions['isAvailable'] = true;
    }
  
    return await this.booksRepository.find({
      where: whereConditions,
      relations: ['library'], 
    });
  }

  async findBookById(id: number): Promise<{ book: BooksEntity, libraries: LibraryEntity[] }> {
    const book = await this.booksRepository.findOneByOrFail({ id });
    const libraries = await this.libraryRepository.find()
    return { book, libraries };
  }
}
