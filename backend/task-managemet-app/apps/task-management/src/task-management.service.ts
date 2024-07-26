import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './tasks.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientKafka } from '@nestjs/microservices';
@Injectable()
export class TaskManagementService {
  constructor(private readonly taskRepository: TaskRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager:Cache,
    // @Inject('NOTIFICATION_SERVICE') private readonly notificationClient:ClientKafka
  ) {}

  async getAllTasks() {
    console.log("invocked");
    await this.cacheManager.set('cache_item',{key:30})
    // this.notificationClient.emit("get_allTasks",)
    const data=await this.cacheManager.get('cache_item')
    console.log(data);
    
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

  async createTask(request: CreateTaskRequest) {
    return this.taskRepository.create(request);
  }
}
