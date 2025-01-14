import { LikeService } from './like.service';
import { Controller } from '@nestjs/common';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
}
