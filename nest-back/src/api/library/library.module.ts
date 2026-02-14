import { Module, forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './library.service';
import { LibraryEntity } from 'src/entities/library.entity';
import { LibraryController } from './library.admin.controller';
import { LibraryCommonController } from './library.common.controller';
import { BookModule } from '../books/books.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([LibraryEntity]), 
  forwardRef(() => BookModule),
],
  controllers: [LibraryController, LibraryCommonController],
  providers: [LibraryService],
  exports: [LibraryService, TypeOrmModule.forFeature([LibraryEntity])],
})
export class LibraryModule {}
