import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @EventPattern('task_created')
  handleTaskCreated(data: any) {
    console.log("hello",data);
    
    this.notificationService.handleTaskCreation(data);
  }
}
