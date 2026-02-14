import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LibraryService } from './library.service';
import { JwtGuard } from 'src/guards/jwt.guards';

@UseGuards(JwtGuard)
@Controller('api/comon/libraries')
export class LibraryCommonController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.libraryService.findById(id);
  }
}
