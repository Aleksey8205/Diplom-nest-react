import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './library.service';
import { LibraryEntity } from 'src/entities/library.entity';
import { LibraryController } from './library.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntity])],
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
