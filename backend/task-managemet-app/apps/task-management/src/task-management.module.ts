import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { TaskManagementController } from './task-management.controller';
import { TaskManagementService } from './task-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskRepository } from './tasks.repository';
import { Task, TaskSchema } from './schemas/task.schema';
// import { GatewayModule } from './gateway/gateway.module';
// import { redisProvider } from './redis/redis.provider';

interface RmqModuleOptions {
  name: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/task-management/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    // GatewayModule,
  ],
  controllers: [TaskManagementController],
  providers: [TaskManagementService, TaskRepository, ],
  // providers: [TaskManagementService, TaskRepository, redisProvider],
})
export class TaskManagementModule {}
