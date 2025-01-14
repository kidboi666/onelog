import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DatabaseModule } from '../../config/database.module';
import { reportsProvider } from './reports.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [...reportsProvider, ReportsService],
})
export class ReportsModule {}
