import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [

    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: `postgres://${ process.env.POSTGRES_USER }:${ process.env.POSTGRES_PASSWORD }@${ process.env.DB_HOST }:${ +process.env.DB_PORT }/${ process.env.POSTGRES_DB }`,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UsersModule,

    AuthModule
    
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
