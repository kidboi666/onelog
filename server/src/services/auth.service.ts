import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signUpUserDto: SignUpUserDto) {
    const { email, password } = signUpUserDto;
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return this.usersService.create({ email, password: result });
  }

  async signin(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;

    const user = await this.usersService.findByEmail(email);

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password is incorrect');
    }

    return user;
  }
}
