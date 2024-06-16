import { Injectable } from '@nestjs/common';
import { updateTaskDto } from './dto/update-task.dto';
import { createTaskDto  } from './dto/create-task.dto';
import { tasks } from './data/task';

@Injectable()
export class TaskService {

  async createTask(data: createTaskDto) {
    return {status: 200, data}
  }

  async getAllTask() {
    return {status: 200, data: tasks}
  }

  async getTaskById(id: number) {
    return {
      status: 200,
      data: tasks.find((task) => task.task_id === id) ?? null
    }
  }

  async updateTaskById(id: number, data: updateTaskDto) {
    return {
      status: 200,
      data: tasks.map((task) => task.task_id === id ? {...task, ...data} : task)
    }
  }

  async deleteTaskById(id: number) {
    return {
      status: 200,
      data: tasks.filter((task) => task.task_id !== id)
    }
  }
}
