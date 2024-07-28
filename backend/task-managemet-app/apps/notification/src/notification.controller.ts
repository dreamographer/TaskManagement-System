import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';
import { EventData } from '@app/common/types/EventType';

// listning to kafka events
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('task_created')
  handleTaskCreated(data: EventData) {
    this.notificationService.handleTaskCreation(data);
  }

  @EventPattern('task_updated')
  handleTaskupdated(data: EventData) {
    this.notificationService.handleTaskUpdation(data);
  }

  @EventPattern('task_deleted')
  handleTaskDeleted(data: EventData) {
    this.notificationService.handleTaskDeletion(data);
  }
}
