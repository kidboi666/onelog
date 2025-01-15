import { DATA_SOURCE } from '../constants';
import { Garden } from './garden.entity';
import { DataSource } from 'typeorm';

export const gardensProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.GARDEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Garden),
    inject: [DATA_SOURCE.INJECT],
  },
];
