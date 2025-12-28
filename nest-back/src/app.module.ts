import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/authentificate/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: 'AqRT82056',
      database: 'mydb',
      synchronize: true,
      logging: false,
      entities: ['dist/**/*.entity.js'],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}