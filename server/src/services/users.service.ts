import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dtos/request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find();

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }

  async create(signUpUserDto: SignUpUserDto): Promise<User> {
    return await this.userRepository.save(signUpUserDto);
  }

  async findById(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not UUID');
    }

    const result = await this.userRepository.findOneBy({ id });

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }

  async findByEmail(email: string): Promise<User> {
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

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not exist or already removed');
    }

    await this.userRepository.remove(user);
  }
}
