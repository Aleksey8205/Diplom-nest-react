import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SearchUserParams, IUserService } from './interfaces/search-user-params';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ _id: id });
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
      skip: params.offset || 0,
      take: params.limit || 10,
      where: whereConditions,
    });
  }
}