import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersAdminController } from './controllers/users.admin.controller';
import { UserEntity } from '../../entities/user.entity';
import { UsersManagerController } from './controllers/users.manager.controller';
import { UsersCommonController } from './controllers/users.common.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersAdminController, UsersManagerController, UsersCommonController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], 
})
export class UsersModule {}