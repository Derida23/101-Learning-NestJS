
interface Tasks {
  task_name: string;
  task_description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  access_token?: accessToken;
  tasks?: Tasks[];
}

export interface accessToken {
  secret: string;
  expires_in: string;
}
