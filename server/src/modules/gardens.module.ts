import { Module } from '@nestjs/common';
import { GardensService } from '../services/gardens.service';
import { GardensController } from '../controllers/gardens.controller';
import { Garden } from '../entities/garden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Garden])],
  controllers: [GardensController],
  providers: [GardensService],
})
export class GardensModule {}
