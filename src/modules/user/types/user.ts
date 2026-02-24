export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  provider: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt?: string;
}
