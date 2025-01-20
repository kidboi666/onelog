import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}
}
