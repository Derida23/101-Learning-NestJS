import { IsNotEmpty, IsString } from "class-validator";

export class createTaskDto { 

  @IsString()
  @IsNotEmpty()
  task_name: string;
  task_description: string;
}
