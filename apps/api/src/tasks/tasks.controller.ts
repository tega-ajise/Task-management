import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  AppRoles,
  CreateTaskDto,
  JwtVerificationResponse,
} from '@task-app/data';
import { UpdateTaskDto } from '@task-app/data';
import {
  CurrentUser,
  JwtAuthGuard,
  Roles,
  RolesGuard,
  ScopeGuard,
} from '@task-app/auth';

@UseGuards(JwtAuthGuard, ScopeGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @Roles(AppRoles.ADMIN)
  findAll(@CurrentUser() user) {
    return this.tasksService.findAll(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  @Put(':id')
  @Roles(AppRoles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: JwtVerificationResponse
  ) {
    return this.tasksService.update(+id, updateTaskDto, user);
  }

  @Delete(':id')
  @Roles(AppRoles.ADMIN)
  remove(@CurrentUser() user, @Param('id') id: string) {
    return this.tasksService.remove(+id, user);
  }
}
