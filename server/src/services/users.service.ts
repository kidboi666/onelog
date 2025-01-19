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
    private repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async create(signUpUserDto: SignUpUserDto): Promise<User> {
    const user = this.repo.create(signUpUserDto);

    return await this.repo.save(user);
  }

  async findById(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not UUID');
    }

    return await this.repo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repo.findOneBy({ email });
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    Object.assign(user, updateUserDto);
    return await this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not exist or already removed');
    }

    await this.repo.remove(user);
  }
}
