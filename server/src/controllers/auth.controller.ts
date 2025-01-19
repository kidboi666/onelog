import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { Serialize } from '../decorators/serialize.decorator';
import { UserInfoResponseDto } from '../dtos/response/user-info-response.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { SignInResponseDto } from '../dtos/response/sign-in-response.dto';
import { TokenDto } from '../dtos/request/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
  async signUp(@Body() dto: SignUpUserDto): Promise<User> {
    return await this.authService.signUp(dto);
  }

  @Post('login')
  async signIn(@Body() dto: SignInUserDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: TokenDto) {
    return await this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  async signOut(@Req() req: any): Promise<{ message: string }> {
    await this.authService.logout(req.user.sub);
    return { message: 'you are logged out' };
  }

  @UseGuards(AuthGuard)
  @Serialize(UserInfoResponseDto)
  @Get('session')
  getSession(@CurrentUser() user: User): User {
    return user;
  }
}
