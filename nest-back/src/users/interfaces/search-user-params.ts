import { UserEntity } from "../user.entity";

export interface SearchUserParams {
  limit: number;
  offset: number;
  email?: string;
  name?: string;
  contactPhone?: string;
}

export interface IUserService {
  create(data: Partial<UserEntity>): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findAll(params: SearchUserParams): Promise<UserEntity[]>;
}
