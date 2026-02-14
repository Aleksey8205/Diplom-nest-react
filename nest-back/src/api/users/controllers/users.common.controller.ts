import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';

import { JwtGuard } from 'src/guards/jwt.guards';


@Controller('api/comon/users')
export class UsersCommonController {
  constructor(private readonly usersService: UsersService) { }


  @UseGuards(JwtGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.usersService.findById((id));
  }
}