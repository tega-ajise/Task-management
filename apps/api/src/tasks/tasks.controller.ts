import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  AppRoles,
  CreateTaskDto,
  JwtVerificationResponse,
} from '@task-app/data';
import { UpdateTaskDto } from '@task-app/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@task-app/auth';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: { user: JwtVerificationResponse }
  ) {
    return this.tasksService.create(createTaskDto, req);
  }

  @Get()
  @Roles(AppRoles.ADMIN)
  findAll() {
    return this.tasksService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  @Put(':id')
  @Roles(AppRoles.ADMIN, AppRoles.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: { user: JwtVerificationResponse }
  ) {
    return this.tasksService.update(+id, updateTaskDto, req);
  }

  @Delete(':id')
  @Roles(AppRoles.ADMIN, AppRoles.OWNER)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
