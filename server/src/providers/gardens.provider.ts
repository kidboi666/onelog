import { DATA_SOURCE } from '../constants/index.constant';
import { Garden } from '../entities/garden.entity';
import { DataSource } from 'typeorm';

export const gardensProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.GARDEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Garden),
    inject: [DATA_SOURCE.INJECT],
  },
];
