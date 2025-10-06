import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard, Roles, RolesGuard } from '@task-app/auth';
import { AppRoles } from '@task-app/data';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AuditController {
  constructor(private audit: AuditService) {}

  // Owner/Admin can view audit log
  @Roles(AppRoles.OWNER, AppRoles.ADMIN)
  @Get('audit-log')
  list(@Req() request: Request) {
    return this.audit.list();
  }
}
