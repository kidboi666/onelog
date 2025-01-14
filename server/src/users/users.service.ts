import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.USER)
    private userRepository: Repository<User>,
  ) {}
}
