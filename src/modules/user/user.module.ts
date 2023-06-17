import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {CacheInterceptor , CacheModule} from '@nestjs/cache-manager';
import { UsersService } from './user.service';
import { RedisService } from '../redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import * as redisStore from 'cache-manager-redis-store';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService , RedisService ],
  exports: [UsersService],
})
export class UsersModule {}
