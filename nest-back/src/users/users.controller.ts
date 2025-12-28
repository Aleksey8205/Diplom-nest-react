import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Partial<UserEntity>) {
    return await this.usersService.create(data);
  }//рабочий

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.usersService.findById((id));
  }//рабочий


  @Get('/')
  async findAll(@Query() query: any): Promise<UserEntity[]> {
    console.log('Received query:', query); 
    return this.usersService.findAll(query); 
  } //обращение через http://localhost:3000/users?email=значение  http://localhost:3000/users?contactPhone=

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.usersService.findByEmail(email);
  }  //рабочий
}