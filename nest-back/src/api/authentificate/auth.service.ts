import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/entities/user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, 
  ) {}

  /**
   * Валидирует пользователя по Email и паролю
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  /**
   * Генерация JWT токена
   */
  generateJWT(userId: number) {
    return this.jwtService.sign({ id: userId });
  }

  /**
   * Регистрация нового пользователя
   */
  async registerUser(userData: { email: string, password: string, name: string, contactPhone: string }): Promise<UserEntity> {
    const newUser = await this.usersService.create({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      contactPhone: userData.contactPhone,
      role: 'client',
    });
    return newUser;
  }

  async checkUser(token: string): Promise<UserEntity | null> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findById(decoded.id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }
}