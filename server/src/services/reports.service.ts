import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.REPORT)
    private reportRepository: Repository<Report>,
  ) {}
}
