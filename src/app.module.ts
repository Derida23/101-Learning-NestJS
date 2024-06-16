import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from './training/training.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TrainingModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
