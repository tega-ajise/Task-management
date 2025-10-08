import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Organizations } from '@task-app/data';

@Injectable()
// Guard that allows access based on user's organization
export class ScopeGuard implements CanActivate {
  constructor(private readonly moduleRef: ModuleRef) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as { organization: Organizations };

    // if there’s no :id on this route, let service layer handle list scoping
    // (create/findAll won't have req.task)
    if (!req.params?.id) return true;

    const task = req.task;
    if (!task) throw new NotFoundException('Task not found');

    const requesterOrg = user?.organization;
    const ownerOrg = task?.owner?.organization as Organizations;

    // Child cannot access tasks whose owner is Parent
    if (
      requesterOrg === Organizations.CHILD &&
      ownerOrg === Organizations.PARENT
    ) {
      return false;
    }

    return true;
  }
}
