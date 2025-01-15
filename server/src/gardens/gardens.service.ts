import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Garden } from './garden.entity';
import { DATA_SOURCE } from '../constants';

@Injectable()
export class GardensService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.GARDEN)
    private gardenRepository: Repository<Garden>,
  ) {}

  findAll() {
    return this.gardenRepository.find();
  }
}
