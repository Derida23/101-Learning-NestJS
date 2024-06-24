import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { updateTaskDto } from './dto/update-task.dto';
import { createTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  // Post Data
    @Post()
    async ceateTask(@Body() data: createTaskDto) {
      return await this.taskService.createTask(data);
    }
    
  // Get Data
    @Get()
    async getAllTask() {
      return await this.taskService.getAllTask();
    }
  
  // Get Data By ID
    @Get(':id')
    async getTaskById(@Param('id') id: number) {
      return await this.taskService.getTaskById(Number(id));
    }
  
  // Update Data
    @Patch(':id')
    async updateTaskById(@Param('id') id: number, @Body() data: updateTaskDto) {
      return await this.taskService.updateTaskById(Number(id), data);
    }
  
  // Delete Data
    @Delete(':id')
    async deleteTaskById(@Param('id') id: number) {
      return await this.taskService.deleteTaskById(Number(id));
    }
    
}

