import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garden } from './garden.entity';
import { GardenService } from './garden.service';
import { GardenController } from './garden.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Garden])],
  controllers: [GardenController],
  providers: [GardenService],
  exports: [GardenService],
})
export class GardenModule {}
