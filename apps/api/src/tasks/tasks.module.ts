import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, User } from '@task-app/data';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from '@task-app/auth';
import { TaskPrefetchMiddleware } from './taskPrefetch.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TasksController],
  providers: [TasksService, JwtAuthGuard, RolesGuard],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskPrefetchMiddleware) // to add task to req obj for the scope guard
      .forRoutes(
        { path: 'tasks/:id', method: RequestMethod.PUT },
        { path: 'tasks/:id', method: RequestMethod.DELETE },
        { path: 'tasks/:id', method: RequestMethod.GET }
      );
  }
}
