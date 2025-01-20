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
import { UserInfoDto } from '../dtos/response/user-info.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { SignInDto } from '../dtos/response/sign-in.dto';
import { TokenDto } from '../dtos/request/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserInfoDto)
  @Post('signup')
  async signUp(
    @Body() dto: SignUpUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signUp(dto);
    this.setUserSession(session, user.id);
    return user;
  }

  @Post('signin')
  async signIn(
    @Body() dto: SignInUserDto,
    @Session() session: any,
  ): Promise<SignInDto> {
    const authResult = await this.authService.signIn(dto);
    this.setUserSession(session, authResult.id);
    return authResult;
  }

  @Post('refresh')
  async refreshToken(@Body() dto: TokenDto) {
    return await this.authService.refreshAccessToken(dto.refreshToken);
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signOut(
    @CurrentUser('sub') userId: string,
  ): Promise<{ message: string }> {
    await this.authService.signOut(userId);
    return { message: 'you are logged out' };
  }

  @Get('session')
  @UseGuards(AuthGuard)
  @Serialize(UserInfoDto)
  getSession(@CurrentUser() user: User): User {
    return user;
  }

  private setUserSession(session: any, userId: string): void {
    session.userId = userId;
  }
}
