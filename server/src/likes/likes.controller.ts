import { LikesService } from './likes.service';
import { Controller } from '@nestjs/common';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
}
