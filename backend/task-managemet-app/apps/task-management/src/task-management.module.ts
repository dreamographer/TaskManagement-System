import { Module } from '@nestjs/common';
import { TaskManagementController } from './task-management.controller';
import { TaskManagementService } from './task-management.service';

@Module({
  imports: [],
  controllers: [TaskManagementController],
  providers: [TaskManagementService],
})
export class TaskManagementModule {}
