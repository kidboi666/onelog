import { Controller, Get } from '@nestjs/common';
import { GardenService } from './garden.service';

@Controller('gardens')
export class GardenController {
  constructor(private readonly gardenService: GardenService) {}

  @Get()
  findAll() {
    return this.gardenService.findAll();
  }
}
