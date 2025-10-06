// look into this more
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// this is what extracts the user from the request object
// and the request object adds the user property to the payload after authentication
// so this decorator can be used in any controller to get the current user
// example usage in a controller method: @CurrentUser() user: { id: string; email: string }
export const CurrentUser = createParamDecorator((_d, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user as { id: string; email: string };
});
