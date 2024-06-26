import { Body, Controller, Post, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { updateTaskDto } from './dto/update-task.dto';
import { createTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Post Data
    @UseGuards(AuthGuard)
    @Post()
    async ceateTask(@Body() data: createTaskDto) {
      return await this.taskService.createTask(data);
    }
    
  // Get Data
    @UseGuards(AuthGuard)
    @Get()
    async getAllTask() {
      return await this.taskService.getAllTask();
    }
  
  // Get Data By ID
    @UseGuards(AuthGuard)
    @Get(':id')
    async getTaskById(@Param('id') id: number) {
      return await this.taskService.getTaskById(Number(id));
    }
  
  // Update Data
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateTaskById(@Param('id') id: number, @Body() data: updateTaskDto) {
      return await this.taskService.updateTaskById(Number(id), data);
    }
  
  // Delete Data
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteTaskById(@Param('id') id: number) {
      return await this.taskService.deleteTaskById(Number(id));
    }
    
}

