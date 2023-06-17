import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: any) {
    return await this.cache.get(key);
  }

  async set(key: any, value: any, ttl: number) {
    await this.cache.set(key, value, ttl * 1000); // from cache-manager v5 they use milliseconds instead of seconds
  }

  async del(key: any) {
    await this.cache.del(key);
  }
}