import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../tasks/tasks.service';
import { TasksController } from '../tasks/tasks.controller';
import { Task, User } from '@task-app/data';
import { Repository } from 'typeorm';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0',
      database: 'task-app',
      entities: [Task, User],
      synchronize: true,
    }),
    // remember these modules help literally modularize the controllers, services, imports, etc
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
