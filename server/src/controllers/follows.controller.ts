import { Controller } from '@nestjs/common';
import { FollowsService } from '../services/follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followService: FollowsService) {}
}
