import axios from "axios";

const API_BASE_URL = "/api/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, payload);
  return response.data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, payload);
  return response.data;
}
