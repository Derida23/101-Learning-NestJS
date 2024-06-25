export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  access_token?: accessToken;
}

export interface accessToken {
  secret: string;
  expires_in: string;
}