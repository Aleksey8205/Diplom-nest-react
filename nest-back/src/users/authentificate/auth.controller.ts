import { Controller, Post, Body, Session, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Роутер входа (Login)
   */
  @Post('login')
  async login(@Req() req, @Res() res, @Body() credentials) {
    const user = await this.authService.validateUser(credentials.email, credentials.password);

    if (!user) {
      return res.status(401).send({ message: 'Authentication failed!' });
    }

    // Начинаем сессию или добавляем cookie/JWT
    req.session.userId = user._id; // Сохраняем уникальный идентификатор пользователя
    res.cookie('auth_token', user.token, { httpOnly: true });

    return res.json({ message: 'Logged in successfully!', user });
  }

  /**
   * Роутер выхода (Logout)
   */
  @UseGuards(AuthGuard('local'))
  @Post('logout')
  logout(@Session() session, @Res() res) {
    session.destroy(err => {
      if (err) {
        console.error('Ошибка удаления сессии:', err.message);
      }
      res.clearCookie('sid');
      res.sendStatus(200);
    });
  }

  /**
   * Роутер регистрации (Register)
   */
  @Post('register')
  async register(@Body() body: { email: string, password: string, name: string, contactPhone: string }) {
    const user = await this.authService.registerUser(body);
    return user;
  }
}