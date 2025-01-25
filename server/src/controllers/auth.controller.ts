import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { AuthResponseDto } from '../dtos/response/auth-response.dto';
import { RefreshTokenDto } from '../dtos/request/refresh-token.dto';
import { UsersService } from '../services/users.service';
import { TokensResponseDto } from '../dtos/response/tokens-response.dto';
import { SessionDto } from '../dtos/response/session.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpUserDto): Promise<AuthResponseDto> {
    return await this.authService.signUp(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInUserDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<TokensResponseDto> {
    return await this.authService.refreshAccessToken(dto.refreshToken);
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async signOut(@CurrentUser('sub') userId: string): Promise<void> {
    await this.authService.signOut(userId);
  }

  @Get('session')
  @UseGuards(AuthGuard)
  async findSession(@CurrentUser('sub') userId: string): Promise<SessionDto> {
    return await this.authService.findSession(userId);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMyInfo(@CurrentUser('sub') userId: string) {
    return await this.usersService.findUserInfoById(userId);
  }
}
