import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [TrainingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
