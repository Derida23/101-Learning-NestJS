import { Injectable } from '@nestjs/common';
import { updateTaskDto } from './dto/update-task.dto';
import { createTaskDto  } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService ) {}

  async createTask(data: createTaskDto) {
    const createData = await this.prisma.tasks.create({
      data
    })
    return {status: 200, data: createData}
  }

  async getAllTask() {
    const getAllData = await this.prisma.tasks.findMany({
      orderBy: {
        id: 'asc'
      },
      where: {
        deleted_at: null
      }
    })
    return {status: 200, data: getAllData}
  }

  async getTaskById(id: number) {
    const findData = await this.prisma.tasks.findFirst({
      where: {
        id
      }
    })
    return {
      status: 200,
      data: findData
    }
  }

  async updateTaskById(id: number, data: updateTaskDto) {
    const updateData = await this.prisma.tasks.update({
      where: {
        id
      },
      data: {...data, updated_at: new Date()}
    })
    return {
      status: 200,
      data: updateData
    }
  }

  async deleteTaskById(id: number) {
    const findData = await this.prisma.tasks.findFirst({
      where: {
        id
      }
    })
    
    await this.prisma.tasks.update({
      where: {
        id
      },
      data: {...findData, deleted_at: new Date()}
    })

    return {
      status: 200,
      message: "Success deleted data"
    }
  }
}
