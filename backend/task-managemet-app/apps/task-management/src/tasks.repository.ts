import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Task } from './schemas/task.schema'
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class TaskRepository extends AbstractRepository<Task> {
  protected readonly logger = new Logger(TaskRepository.name);

  constructor(
    @InjectModel(Task.name) taskModel: Model<Task>,
    @InjectConnection() connection: Connection,
  ) {
    super(taskModel, connection);
  }
}
