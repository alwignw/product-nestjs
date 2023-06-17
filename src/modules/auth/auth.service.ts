import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import CreateUser from '../../common/dto/create.dto';
import { comparePasswords } from '../../common/utils/compare-pass.utils';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, password) {
    const user = await this.usersService.findOne(email);
    const compare = await comparePasswords(password, user.password)
    if(!compare) {
      throw new Error('Passwords or Email wrong')
    }
       
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findUsers() {
    try {
      return await this.usersService.findAll();
    } catch (error) {

      throw new UnauthorizedException();
    }
  }

  async findUsersByEmail(email:string) {
    try {
      return await this.usersService.findOne(email);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async createUser(user: CreateUser) {
    try {
      return await this.usersService.createUser(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }


  async deleteUser(id: number) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  
  async updateUser(user: CreateUser) {
    try {
      return await this.usersService.updateUser(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }


  
  
}
