import { NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class ExceptionUtil<T> {
  protected constructor(protected readonly repo: Repository<T>) {}

  async findOneOrFail(params: FindOptionsWhere<T>): Promise<T> {
    const result = await this.repo.findOneBy(params);
    if (!result) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }

  async findOrFail(params: FindOptionsWhere<T>): Promise<T[]> {
    const result = await this.repo.findBy(params);
    if (result.length === 0) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
}
