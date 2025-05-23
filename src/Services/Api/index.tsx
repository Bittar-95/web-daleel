import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: BACKEND_ENDPOINT,
  withCredentials: false,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      'ApiKey': API_KEY, 
    };
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error?.response?.data || error);
  }
);

export default api;
