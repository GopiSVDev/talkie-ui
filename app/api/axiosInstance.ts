import { useAuthStore } from "~/store/useAuthStore";
import { isTokenExpired } from "~/utils/jwt";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  const expiresAt = useAuthStore.getState().expiresAt;

  if (accessToken) {
    if (isTokenExpired(expiresAt)) {
      useAuthStore.getState().logout();
      return Promise.reject(new Error("Token expired"));
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export const API_BASE_URL = instance.defaults.baseURL;

export default instance;
