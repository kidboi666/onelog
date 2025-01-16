import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { Report } from '../entities/report.entity';

export const reportsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.REPORT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Report),
    inject: [DATA_SOURCE.INJECT],
  },
];
