import { Controller, Get } from '@nestjs/common';
import { GardensService } from './gardens.service';

@Controller('gardens')
export class GardensController {
  constructor(private readonly gardenService: GardensService) {}

  @Get()
  findAll() {
    return this.gardenService.findAll();
  }
}
