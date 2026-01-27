import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { SearchUserParams, IUserService } from './interfaces/search-user-params';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: { email: string, password: string, name: string, contactPhone: string, role: 'client' | 'admin' | 'manager' }): Promise<UserEntity> {

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = this.userRepository.create({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        contactPhone: data.contactPhone,
        role: data.role, 
      });
      
      return await this.userRepository.save(newUser);
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ email });
  }

  async findAll(params: SearchUserParams): Promise<UserEntity[]> {
    let whereConditions = {};
  
    if (params.email) {
      whereConditions['email'] = Like(`%${params.email}%`);
    }
  
    if (params.name) {
      whereConditions['name'] = Like(`%${params.name}%`);
    }
  
    if (params.contactPhone) {
      whereConditions['contactPhone'] = Like(`%${params.contactPhone}%`);
    }

    return await this.userRepository.find({
      skip: params.offset,
      take: params.limit,
      where: whereConditions,
    });
  }

}