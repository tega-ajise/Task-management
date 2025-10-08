import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, User } from '@task-app/data';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule, UsersModule } from '@task-app/auth';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // remember to set up a .env file with the following variables or adjust as needed
        // also ensure your database server is running and accessible with these credentials
        // you can also use a different database like mysql, sqlite, etc by changing the 'type' and relevant connection options
        type: 'postgres',
        host: configService.get('DB_HOST') ?? 'localhost',
        // might need to add + to assert it is a number
        port: configService.get('DB_PORT') ?? 5432,
        username: configService.get('DB_USERNAME') ?? 'postgres',
        password: configService.get('DB_PASSWORD') ?? '0',
        database: configService.get('DB_NAME') ?? 'task-app',
        entities: [Task, User],
        synchronize: true,
      }),
    }),
    // remember these modules help literally modularize the controllers, services, imports, etc
    TasksModule,
    AuthModule,
    UsersModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
