import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { DATA_SOURCE } from '../constants';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.REPORT)
    private reportRepository: Repository<Report>,
  ) {}
}
