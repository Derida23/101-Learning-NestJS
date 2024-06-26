import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateTaskDto { 
  @IsString()
  @IsNotEmpty()
  task_name: string;


  @IsString()
  @IsNotEmpty()
  task_description: string;

  @IsOptional()
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  id_user: number;
  
}