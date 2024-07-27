import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '@app/common/types/taskStatus.enum';
import { TaskPriority } from '@app/common/types/taskPriority.enum';
  

@Schema({ versionKey: false })
export class Task extends AbstractDocument {
  @Prop({ required: true })
  title: string;
 
  @Prop({ required: false })
  description?: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ type: String, enum: TaskPriority, required: false })
  priority: TaskPriority;

  @Prop({ required: false })
  section?: string;

  @Prop({ required: false })
  dueDate?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
