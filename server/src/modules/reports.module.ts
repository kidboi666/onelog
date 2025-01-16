import { Module } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ReportsController } from '../controllers/reports.controller';
import { DatabaseModule } from '../config/database.module';
import { reportsProvider } from '../providers/reports.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [...reportsProvider, ReportsService],
})
export class ReportsModule {}
