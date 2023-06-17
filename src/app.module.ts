import { Module  } from '@nestjs/common';
import { CacheModule , CACHE_MANAGER } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/produts/product.module'
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '../src/modules/database/database.module';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import {RedisCacheModule} from "./modules/redis/redis.module"


const objValidation = {
  envFilePath: '.env',
  validationSchema: Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(), 
    PORT: Joi.number(),
    autoLoadEntities: true
  }),
};


@Module({
  imports: [   
    ConfigModule.forRoot(objValidation) , 
    RedisCacheModule,
    DatabaseModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
