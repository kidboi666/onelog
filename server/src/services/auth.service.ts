import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from '../dtos/response/auth-response.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { ConfigService } from '@nestjs/config';
import { TokensResponseDto } from '../dtos/response/tokens-response.dto';

const scrypt = promisify(_scrypt);

/**
 * 의존성 주입 활성화
 * - AuthService는 UsersService와 JwtService가 필요함
 * - @Injectable() 이 있으면 nest가 자동으로 UsersService와 JwtService를 주입해줌
 * - 마치 "이 클래스는 다른 서비스들이 필요할 수 있으니, nest 너가 관리 해줘!" 라고 말하는 것과 같음
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpUserDto): Promise<AuthResponseDto> {
    const { email, password } = await this.validateNewUser(dto);
    const result = await this.hashPassword(password);

    const user = await this.usersService.createUser({
      email,
      password: result,
    });
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(dto: SignInUserDto): Promise<AuthResponseDto> {
    const user = await this.validateCredentials(dto);
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(userId: string): Promise<void> {
    await this.usersService.removeRefreshToken(userId);
  }

  async refreshAccessToken(refreshToken: string): Promise<TokensResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findUserById(payload.sub);
      const isInvalid =
        !user ||
        user.refreshToken !== refreshToken ||
        user.refreshTokenExp < new Date();

      if (isInvalid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = this.generateTokens(user);
      await this.usersService.saveRefreshToken(user.id, refreshToken);

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: User): Promise<TokensResponseDto> {
    const payload = { sub: user.id, username: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateCredentials(dto: SignInUserDto): Promise<User> {
    const { email, password } = dto;
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password is Incorrect');
    }

    return user;
  }

  private async validateNewUser(
    dto: SignUpUserDto,
  ): Promise<{ email: string; password: string }> {
    const { email, password } = dto;
    const user = await this.usersService.findUserByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    return { email, password };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }
}
