import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './admin/users/users.module';
import { LibraryModule } from './admin/library/library.module';
// import { AuthModule } from './authentificate/auth.module';

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
    // AuthModule,
    UsersModule,
    LibraryModule,
  ],
})
export class AppModule {}