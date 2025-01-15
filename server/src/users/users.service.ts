import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE } from '../constants';
import { UpdateUserDto } from './dtos/request/update-user.dto';
import { SignUpUserDto } from '../auth/dtos/request/sign-up-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.USER)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const result = await this.userRepository.find();

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }

  async create(signUpUserDto: SignUpUserDto) {
    const { email } = signUpUserDto;
    const alreadyExists = await this.userRepository.findOneBy({
      email,
    });

    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }

    await this.userRepository.save(signUpUserDto);
  }

  async findById(id: string) {
    const result = await this.userRepository.findOneBy({ id });

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }

  async findByEmail(email: string) {
    const result = await this.userRepository.findOneBy({ email });

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not exist or already removed');
    }

    await this.userRepository.remove(user);
  }
}
