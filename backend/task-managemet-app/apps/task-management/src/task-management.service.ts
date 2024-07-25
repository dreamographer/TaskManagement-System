import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TaskManagementService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async getAllTasks() {
    return this.taskRepository.find({});
  }

  async updateTasks(taskId: string, updateData: Partial<CreateTaskRequest>) {
    // await this.redis.del(taskId);
    return this.taskRepository.findByIdAndUpdate(taskId, updateData);
  }

  async deleteTask(taskId: string) {
    await this.taskRepository.deleteById(taskId);
    // await this.redis.del(taskId);
    return { success: 'Task deleted successfully' };
  }

  async getTask(taskId: string) {
    // const cachedTask = await this.redis.get(taskId);
    // if (cachedTask) {
    //   return JSON.parse(cachedTask);
    // }
    const task = await this.taskRepository.findById(taskId);
    // await this.redis.set(taskId, JSON.stringify(task), 'EX', 3600);
    return task;
  }

  async createTask(request: CreateTaskRequest) {
    return this.taskRepository.create(request);
  }
}
