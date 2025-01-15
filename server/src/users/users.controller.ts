import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/request/update-user.dto';
import { UserDto } from './dtos/response/user.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AuthService } from '../auth/auth.service';
import { SignUpUserDto } from '../auth/dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../auth/dtos/request/sign-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  @Post('/signin')
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Serialize(UserDto)
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Serialize(UserDto)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ): Promise<void> {
    return this.userService.update(id, updateUserDto);
  }
}
