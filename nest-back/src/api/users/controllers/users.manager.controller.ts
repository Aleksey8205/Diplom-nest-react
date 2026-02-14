import { Controller, Get, Param,  Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserEntity } from '../../../entities/user.entity';
import { JwtGuard } from 'src/guards/jwt.guards';
import { Roles } from 'src/guards/roles.decorator';

@Controller('api/manager/users')
export class UsersManagerController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtGuard)
  @Roles('manager')
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.usersService.findById((id));
  }//рабочий


  @Get('/')
  async findAll(@Query() query: any): Promise<UserEntity[]> {
    return this.usersService.findAll(query);
  } //обращение через http://localhost:3000/users?email=значение  http://localhost:3000/users?contactPhone=

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.usersService.findByEmail(email);
  }  //рабочий
}