import axios from 'axios'; // <- kendi instance yerine düz axios

const AUTH_BASE_URL = 'https://cvcim.xyz/auth'; // ✅ doğrudan base

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = (data: LoginRequest) => {
  return axios.post(`${AUTH_BASE_URL}/authenticate`, data); // ✅
};

export const registerUser = (data: RegisterRequest) => {
  return axios.post(`${AUTH_BASE_URL}/register`, data); // ✅
};
