import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE } from '../../constants/data-source';
import { CreateUserDto } from './dto/create-user.dto';

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

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const alreadyExists = await this.userRepository.findOne({
      where: { email },
    });
    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findById(id: string) {
    const result = await this.userRepository.findOne({ where: { id } });

    if (!result) {
      throw new BadRequestException('User does not exist');
    }

    return result;
  }
}
