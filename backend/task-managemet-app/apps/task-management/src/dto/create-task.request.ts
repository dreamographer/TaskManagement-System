import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { TaskStatus } from '@app/common/types/taskStatus.enum';
import { TaskPriority } from '@app/common/types/taskPriority.enum';

// DTO object for Tasks
export class CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority: TaskPriority;

  @IsString()
  @IsOptional()
  section?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}
