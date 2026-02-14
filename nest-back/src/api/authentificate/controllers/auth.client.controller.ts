import {
    Controller,
    Post,
    Body,
    Response,
  } from '@nestjs/common';
  import { AuthService } from '../auth.service';
  
  @Controller('api/client')
  export class AuthClientController {
    constructor(private readonly authService: AuthService) {}


    @Post('register')
    async register(
      @Body()
      body: {
        email: string;
        password: string;
        name: string;
        contactPhone: string;
      },
      @Response() res,
    ) {
      try {
        const user = await this.authService.registerUser(body);
        return res
          .status(201)
          .json({ message: 'Пользователь успешно зарегистрирован.' });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Email уже используется' });
      }
    }
  }