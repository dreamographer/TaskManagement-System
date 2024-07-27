import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './tasks.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientKafka } from '@nestjs/microservices';
import { taskCreatedEvent } from './task-created.event';
@Injectable()
export class TaskManagementService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientKafka,
  ) {}

  async createTask(request: CreateTaskRequest) {
    this.notificationClient.emit('task_created', {message:request.title});
    return this.taskRepository.create(request);
  }

  async getAllTasks() {
    return this.taskRepository.find({});
  }

  async updateTasks(taskId: string, updateData: Partial<CreateTaskRequest>) {
    return this.taskRepository.findByIdAndUpdate(taskId, updateData);
  }

  async deleteTask(taskId: string) {
    await this.taskRepository.deleteById(taskId);
    return { success: 'Task deleted successfully' };
  }

  async getTask(taskId: string) {
    // await this.
    const task = await this.taskRepository.findById(taskId);
    return task;
  }
}
