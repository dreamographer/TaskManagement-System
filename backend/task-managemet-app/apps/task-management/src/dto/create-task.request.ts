import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { TaskStatus } from '../../../../libs/common/src/types/taskStatus.enum';
import { TaskPriority } from '../../../../libs/common/src/types/taskPriority.enum';

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
