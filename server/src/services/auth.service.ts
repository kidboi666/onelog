import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const { email, password } = signUpUserDto;
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return await this.usersService.create({ email, password: result });
  }

  async signIn(signInUserDto: SignInUserDto): Promise<User> {
    const { email, password } = signInUserDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password is incorrect');
    }

    return user;
  }
}
