import { Module } from '@nestjs/common';
import { GardensService } from './gardens.service';
import { GardensController } from './gardens.controller';
import { DatabaseModule } from '../../config/database.module';
import { gardensProvider } from './gardens.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GardensController],
  providers: [...gardensProvider, GardensService],
  exports: [GardensService],
})
export class GardensModule {}
