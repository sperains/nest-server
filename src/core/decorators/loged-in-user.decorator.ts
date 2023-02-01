import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 用于从request中获取当前登录的用户
 */
export const LogedInUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
