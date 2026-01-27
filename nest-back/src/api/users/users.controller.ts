import { Controller, Post, Get, Param, Body, Query, UseGuards, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../../entities/user.entity';
import { JwtGuard } from 'src/guards/jwt.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Response() res, @Body() data:{ email: string, password: string, name: string, contactPhone: string, role: 'client' | 'admin' | 'manager' }) {
   try{
    const user = await this.usersService.create(data)
    return res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });;
   } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Email уже используется' });
  }
  }//рабочий

  @UseGuards(JwtGuard)
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