import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}
}
