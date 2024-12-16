import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_user,
      password: envs.db_pass,
      database: envs.db_name,
      synchronize: true,
      entities: [User],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
