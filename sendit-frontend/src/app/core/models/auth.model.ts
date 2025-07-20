export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // Add other registration fields as needed
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  role: 'admin' | 'user';
} 