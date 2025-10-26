import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const API_BASE_URL = instance.defaults.baseURL;
export default instance;
