import { Module } from '@nestjs/common';
import { GardensService } from '../services/gardens.service';
import { GardensController } from '../controllers/gardens.controller';
import { DatabaseModule } from '../config/database.module';
import { gardensProvider } from '../providers/gardens.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GardensController],
  providers: [...gardensProvider, GardensService],
  exports: [GardensService],
})
export class GardensModule {}
