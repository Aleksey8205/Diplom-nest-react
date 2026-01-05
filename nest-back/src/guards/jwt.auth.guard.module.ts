import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../api/authentificate/auth.module';
import { UsersModule } from 'src/api/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guards';
import { jwtConstants } from './constants';
import { RolesGuard } from './role.guard';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, JwtGuard, RolesGuard],
  exports: [],
})
export class GuardModule { }