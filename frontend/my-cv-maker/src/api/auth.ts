import axios from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const login = (data: LoginRequest) =>
  axios.post<AuthResponse>('/auth/login', data);

export const registerUser = (data: RegisterRequest) =>
  axios.post<AuthResponse>('/auth/register', data);
