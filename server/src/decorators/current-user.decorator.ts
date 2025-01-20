import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    /**
     * @Problem
     * Param decorators exist outside the DI system,
     * so our decorator can't get an instance of UsersService directly
     */
    return request.currentUser;
    /**
     * @Solution
     * make an interceptor to get the current user,
     * then use the value produced by it in the decorator
     */
  },
);
