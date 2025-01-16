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
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserDto } from '../dtos/response/user.dto';
import { AuthService } from '../services/auth.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { Serialize } from '../decorators/index.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    await this.authService.signup(signUpUserDto);
  }

  @Post('/signin')
  async signin(@Body() signInUserDto: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signin(signInUserDto);
    session.userId = user.id;
    console.log(session);
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
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
  @Get('/whoami')
  whoAmI(@Session() session: any) {
    console.log(session);
    return this.userService.findById(session.userId);
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
