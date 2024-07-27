import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './tasks.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientKafka } from '@nestjs/microservices';
@Injectable()
export class TaskManagementService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientKafka,
  ) {}

  async createTask(request: CreateTaskRequest) {
    const res=await this.taskRepository.create(request);
    this.notificationClient.emit('task_created', {
      event: 'CREATED',
      task:res
    });

    return res
  }

  async getAllTasks() {

    return this.taskRepository.find({});
  }

  async updateTasks(taskId: string, updateData: Partial<CreateTaskRequest>) {
    const res = await this.taskRepository.findByIdAndUpdate(taskId, updateData);

    this.notificationClient.emit('task_updated', {
      event: 'UPDATED',
      task:res
    });
    

    return res
  }

  async deleteTask(taskId: string) {
    await this.taskRepository.deleteById(taskId);
    this.notificationClient.emit('task_deleted', {event:"DELETED",task:{_id:taskId} });

    return { success: 'Task deleted successfully' };
  }

  async getTask(taskId: string) {
    const task = await this.taskRepository.findById(taskId);
    
    return task;
  }
}
