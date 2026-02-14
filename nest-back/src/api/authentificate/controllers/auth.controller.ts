import {
  Controller,
  Post,
  Body,
  Request,
  Response,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtGuard } from 'src/guards/jwt.guards';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Response() res, @Body() credentials) {
    try {
      const user = await this.authService.validateUser(
        credentials.email,
        credentials.password,
      );

      if (!user) {
        return res.status(401).json({ message: 'Неверные учетные данные.' });
      }
      const token = await this.authService.generateJWT(user.id);

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 3600000,
      });

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      return res.json({userData, message: 'Авторизация успешна.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка сервера.' });
    }
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Response() res) {
    res.clearCookie('auth_token');
    res.sendStatus(200);
  }

  @UseGuards(JwtGuard)
  @Get('user-info')
  async checkUser(@Request() req, @Response() res) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      phone: user.contactPhone,
      email: user.email,
      role: user.role,
    });
  }
}
