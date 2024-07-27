import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { TaskManagementController } from './task-management.controller';
import { TaskManagementService } from './task-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskRepository } from './tasks.repository';
import { Task, TaskSchema } from './schemas/task.schema';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { GatewayModule } from './gateway/gateway.module';

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
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: ['kafka:9092'], //TODO :might want to update
          },
          consumer: {
            groupId: 'notification-consumer',
          },
        },
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 5,
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    // GatewayModule,
  ],
  controllers: [TaskManagementController],
  providers: [
    TaskManagementService,
    TaskRepository,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
  // providers: [TaskManagementService, TaskRepository, redisProvider],
})
export class TaskManagementModule {}
