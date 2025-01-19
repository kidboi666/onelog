import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { Serialize } from '../decorators/serialize.decorator';
import { UserDto } from '../dtos/response/user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signUp(signUpUserDto);
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signIn(signInUserDto);
    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any): void {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  @Get('/session')
  getSession(@CurrentUser() user: User): User {
    return user;
  }
}
