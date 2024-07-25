import { NestFactory } from '@nestjs/core';
import { TaskManagementModule } from './task-management.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {  
  const app = await NestFactory.create(TaskManagementModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService=app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
