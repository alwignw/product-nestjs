import { Injectable, UnauthorizedException ,Inject  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import UserEntity from './user.entity';
import CreateUser from '../../common/dto/create.dto';
import { CACHE_MANAGER ,   } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisService } from '../redis/redis.service';
export type User = any;


@Injectable()
export class UsersService {

  constructor(
    private redisService: RedisService,
    @InjectRepository(UserEntity)
    public usersRepository: Repository<UserEntity>,
  ) {}



  async findAll(): Promise<UserEntity[]> {
    try {

      const cachedValue:any = await this.redisService.get('cached_item');
      if(cachedValue){
        return JSON.parse(cachedValue);
      }
      
      const data = await this.usersRepository.find();
      await this.redisService.set('cached_item',  JSON.stringify(data) , 10 );
      return data
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createUser(user: CreateUser) {
    try {
      const newUser = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({
        id: id,
      });
      await this.usersRepository.remove(user);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }


  async updateUser(user: CreateUser) {
    try {
      const rest = await this.usersRepository.findOneBy({
        id: user.id,
      });
      rest.name = user.name,
      rest.email = user.email
      await this.usersRepository.save(rest);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
