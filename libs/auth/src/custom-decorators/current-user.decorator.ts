// look into this more
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtVerificationResponse } from '@task-app/data';

// this is what extracts the user from the request object
// and the request object adds the user property to the payload after authentication
// so this decorator can be used in any controller to get the current user
// example usage in a controller method: @CurrentUser() user: { id: string; email: string }
export const CurrentUser = createParamDecorator(
  (data: keyof JwtVerificationResponse, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtVerificationResponse;
    return data ? user?.[data] : user;
  }
);
