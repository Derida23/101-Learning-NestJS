import { Injectable, NotFoundException } from '@nestjs/common';
import { updateTaskDto } from './dto/update-task.dto';
import { createTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse, Task } from './interface';
import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: any,
  ) { }

  async createTask(data: createTaskDto) {
    data.id_user = this.req.user.id;
    const createData = await this.prisma.tasks.create({
      data
    })

    return this.buildResponse(createData, "Successfully created task")
  }

  async getAllTask() {
    const getAllData = await this.prisma.tasks.findMany({
      orderBy: {
        id: 'asc'
      },
      where: {
        deleted_at: null,
        id_user: this.req.user.id
      },
    })

    return this.buildResponse(getAllData, "Successfully get all tasks")
  }

  async getTaskById(id: number) {
    const findData = await this.prisma.tasks.findFirst({
      where: {
        id,
        id_user: this.req.user.id,
        deleted_at: null,
      }
    })

    if (!findData) {
      return this.buildResponse(null, "Successfully get task")
    }

    return this.buildResponse(findData, "Successfully get task")
  }

  async updateTaskById(id: number, data: updateTaskDto) {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
        id_user: this.req.user.id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updateData = await this.prisma.tasks.update({
      where: {
        id,
        id_user: this.req.user.id,
        deleted_at: null,
      },
      data: { ...data, updated_at: new Date() }
    })

    return this.buildResponse(updateData, "Successfully updated task")
  }

  async deleteTaskById(id: number) {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
        id_user: this.req.user.id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    const findData = await this.prisma.tasks.findFirst({
      where: {
        id,
        id_user: this.req.user.id,
      }
    })

    await this.prisma.tasks.update({
      where: {
        id
      },
      data: { ...findData, deleted_at: new Date() }
    })

    return this.buildResponse(findData, "Successfully deleted task")
  }

  private buildResponse(task?: Task | Task[], message?: string): ApiResponse<Partial<Task>> {
    let payload: Partial<Task> | Partial<Task>[];

    if (!task) {
      payload = null;
    } else {
      if (Array.isArray(task)) {
        payload = task.map(t => ({
          id: t.id,
          task_name: t.task_name,
          task_description: t.task_description,
        }));
      } else {
        payload = {
          id: task.id,
          task_name: task.task_name,
          task_description: task.task_description,
        };
      }
    }


    return {
      message: message,
      data: payload,
      statusCode: 200,
    };
  }
}
