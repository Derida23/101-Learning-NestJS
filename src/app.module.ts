import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from './training/training.module';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TrainingModule, TaskModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
