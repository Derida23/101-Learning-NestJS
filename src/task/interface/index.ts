export interface Task {
  id: number
  task_name: string
  task_description: string
  created_at: Date
  updated_at?: Date
  deleted_at?: Date
  id_user: number
}

export type ApiResponse<T> = {
  message: string;
  data: T | T[];
  statusCode: number;
}