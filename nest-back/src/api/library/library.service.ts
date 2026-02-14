import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryEntity } from '../../entities/library.entity';
import { Repository } from 'typeorm';
import { BooksEntity } from 'src/entities/books.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(LibraryEntity)
    private readonly libraryRepository: Repository<LibraryEntity>,
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
  ) {}

  async createLibrary(data: {
    name: string;
    address: string;
    description: string;
  }): Promise<LibraryEntity> {
    const newLibrary = this.libraryRepository.create(data);
    return await this.libraryRepository.save(newLibrary);
  }

  async deleteLibrary(id: number): Promise<void> {
    await this.libraryRepository.delete(id);
  }

  async updateLibrary(
    id: number,
    data: { name?: string; address?: string; description?: string },
  ): Promise<LibraryEntity> {
    const library = await this.libraryRepository.findOneByOrFail({ id });
    Object.assign(library, data);
    return await this.libraryRepository.save(library);
  }
  
  async findAll(): Promise<LibraryEntity[]> {
    return await this.libraryRepository.find();
  }

  async findById(id: number): Promise<{library: LibraryEntity, books: BooksEntity[]}> {
    const library = await this.libraryRepository.findOneByOrFail({id})
    const books = await this.booksRepository.find({
      relations: ['library'],
      where: { library: { id } }, 
    });

    return {  books, library };
  }

}
