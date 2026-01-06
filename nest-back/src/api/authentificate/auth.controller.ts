import { Controller, Post, Body, Request, Response, UseGuards, SetMetadata, Get} from "@nestjs/common";
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/guards/jwt.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  /**
   * Роутер входа (Login)
   */
  @Post('login')
  async login(@Request() req, @Response() res, @Body() credentials) {
    try {
      const user = await this.authService.validateUser(credentials.email, credentials.password);

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

      return res.json({ message: 'Авторизация успешна.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка сервера.' });
    }
  }

  /**
   * Роутер выхода (Logout)
  */
  //для применения ролей JwtGuard, RolesGuard декоратор @Roles(admin/и тд)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles('client') только так иначе никак

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Response() res) {

    res.clearCookie('auth_token');
    res.sendStatus(200);
  }

  /**
   * Роутер регистрации (Register)
   */
  @Post('register')
  async register(@Body() body: { email: string, password: string, name: string, contactPhone: string }, @Response() res) {
    try {
      const user = await this.authService.registerUser(body);
      return res.status(201).json({ message: 'Пользователь успешно зарегистрирован.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка сервера.' });
    }
  }

  @UseGuards(JwtGuard)
  @Get('check')
  checkAuth() {
    return { authenticated: true }; 
  }
}
