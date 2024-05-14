import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingService {
  getTraining() {
    return {
      message: 'success received training'
    }
  }
}
