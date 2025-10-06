import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from '../custom-decorators/roles.decorator';
import { AppRoles } from '@task-app/data';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // gets this from the @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<AppRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === user?.role);
    // need to also check if user is owner by comparing userId with resource ownerId
  }
}
