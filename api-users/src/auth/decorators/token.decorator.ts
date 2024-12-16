import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new Error('No authorization header found');
    }
    return request.headers.authorization?.split(' ')[1];
  },
);
