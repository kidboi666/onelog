import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      request.currentUser = await this.usersService.findById(userId);
    }

    return next.handle();
  }
}
