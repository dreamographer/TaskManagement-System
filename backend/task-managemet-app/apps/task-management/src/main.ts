import { NestFactory } from '@nestjs/core';
import { TaskManagementModule } from './task-management.module';

async function bootstrap() {  
  const app = await NestFactory.create(TaskManagementModule);
  await app.listen(3000);
}
bootstrap();
