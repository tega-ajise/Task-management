import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard, Roles, RolesGuard } from '@task-app/auth';
import { AppRoles, JwtVerificationResponse } from '@task-app/data';
import { CurrentUser } from '@task-app/auth';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AuditController {
  constructor(private audit: AuditService) {}

  // Owner/Admin can view audit log
  @Roles(AppRoles.ADMIN)
  @Get('audit-log')
  list(@CurrentUser() user: { id: string; email: string }) {
    return this.audit.list();
  }

  @Roles(AppRoles.USER)
  @Get('me')
  me(@CurrentUser() user: JwtVerificationResponse) {
    return user;
  }
}
