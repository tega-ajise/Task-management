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
        // you can also use a different database like mysql, sqlite, etc by changing the 'type' and relevant connection options
        type: 'postgres',
        host: configService.get('DB_HOST') ?? '',
        // might need to add + to assert it is a number
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME') ?? '',
        password: configService.get('DB_PASSWORD') ?? '',
        database: configService.get('DB_NAME') ?? '',
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
