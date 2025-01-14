import { DATA_SOURCE } from '../../constants/data-source';
import { DataSource } from 'typeorm';
import { Report } from './report.entity';

export const reportsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.REPORT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Report),
    inject: [DATA_SOURCE.INJECT],
  },
];
