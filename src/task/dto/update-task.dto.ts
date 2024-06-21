import { IsOptional } from "class-validator";

export class updateTaskDto { 

  task_name: string;
  task_description: string;
  @IsOptional()
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  
}