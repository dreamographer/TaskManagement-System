import { Injectable } from '@nestjs/common';

import { NotificationGateway } from './notification.gateway';
import { EventData } from '@app/common/types/EventType';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  handleTaskCreation(event: EventData) {
    this.notificationGateway.sendTaskCreatedNotification(event);
  }

  handleTaskUpdation(event: EventData) {
    this.notificationGateway.sendTaskCreatedNotification(event);
  }

  handleTaskDeletion(event: EventData) {
    this.notificationGateway.sendTaskCreatedNotification(event);
  }
}
