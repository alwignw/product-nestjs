import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import CreateUser from '../../common/dto/create.dto';
import { comparePasswords } from '../../common/utils/compare-pass.utils';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin|login')
  async signIn(@Request() req, @Response() res) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.signIn(email, password);
      res.cookie('access_token', token, { httpOnly: true });
      return res.json(token);    
    } catch (error) {
      res.status('401').json({msg:error.message});
    }
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async getuser() {
    return await this.authService.findUsers();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createUser(@Body() user: CreateUser) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    let payload = { ...user, password: hashedPassword };
    return this.authService.createUser(payload);
  }

  @UseGuards(AuthGuard)
  @Delete('deleteUser/:id')
  async deleteUser(@Param() param: any) {   
    const {id} = param;
    return this.authService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put('editUser')
  async updateUser(@Body() user: CreateUser) {   
    return this.authService.updateUser(user);
  }


  @Post('userByEmail')
  async userByEmail(@Body() user: CreateUser){
    const rest = await this.authService.findUsersByEmail(user.email);
    return rest
  }
  
}
