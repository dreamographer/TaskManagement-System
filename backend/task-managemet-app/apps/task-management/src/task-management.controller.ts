import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TaskManagementService } from './task-management.service';
import { CreateTaskRequest } from './dto/create-task.request';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('tasks')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  // caching with redis
  @UseInterceptors(CacheInterceptor) //all get requests will be cached
  @CacheTTL(10) //set to 10 seconds
  @Get()
  async getAllTasks() {
    return this.taskManagementService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') taskId: string) {
    return this.taskManagementService.getTask(taskId);
  }

  @Post()
  async createTask(@Body() request: CreateTaskRequest) { 
    return this.taskManagementService.createTask(request);
  }

  @Put(':id')
  async updateTasks(
    @Body() request:Partial<CreateTaskRequest>,
    @Param('id') taskId: string,
  ) {
    return this.taskManagementService.updateTasks(taskId, request);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    return this.taskManagementService.deleteTask(taskId);
  }
}
