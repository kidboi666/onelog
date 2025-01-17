import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Garden } from '../entities/garden.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GardensService {
  constructor(
    @InjectRepository(Garden)
    private gardenRepository: Repository<Garden>,
  ) {}

  findAll() {
    return this.gardenRepository.find();
  }
}
