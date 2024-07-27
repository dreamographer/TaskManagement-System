import { Injectable } from '@nestjs/common';
import { taskCreatedEvent } from './task-created.event';

@Injectable()
export class NotificationService {
  
  getHello(): string {
    return 'Hello World!';
  }
  handleTaskCreation(taskCreatedEvent: {message:string}) {
    console.log("Come inside notification ",taskCreatedEvent.message);
  }
}
