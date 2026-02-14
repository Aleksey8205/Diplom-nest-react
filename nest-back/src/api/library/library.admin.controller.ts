import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Put,
  UseGuards
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryEntity } from 'src/entities/library.entity';
import { JwtGuard } from 'src/guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('api/admin/libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  async findAll(): Promise<LibraryEntity[]> {
    return this.libraryService.findAll();
  }

  @Post()
  async create(
    @Body() data: { name: string; address: string; description: string },
  ) {
    return await this.libraryService.createLibrary(data);
  }

  @Put(':id')
  async updateLibrary(
    @Param('id') id: number,
    @Body() data: { name?: string; address?: string; description?: string },
  ): Promise<LibraryEntity> {
    return this.libraryService.updateLibrary(id, data);
  }

  @Delete(':id')
  async deleteLibrary(@Param('id') id: number) {
    return await this.libraryService.deleteLibrary(id);
  }
}
