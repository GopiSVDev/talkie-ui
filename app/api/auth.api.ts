import axios from './axiosInstance';

interface RegisterPayload {
  username: string;
  name: string;
  password: string;
  
}

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const register = async (
  data: RegisterPayload,
): Promise<LoginResponse> => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', data);
  return response.data;
};

export const guestLogin = async (): Promise<LoginResponse> => {
  const response = await axios.post('/auth/guest');
  return response.data;
};

export const refreshTokens = async (
  refreshToken: string,
): Promise<LoginResponse> => {
  const response = await axios.post('/auth/refresh', { refreshToken });

  return response.data;
};
