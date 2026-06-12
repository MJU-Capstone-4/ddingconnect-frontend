import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '';

const PUBLIC_PATHS = [
  '/api/v1/auth/login',
  '/api/v1/auth/send-code',
  '/api/v1/auth/verify-code',
  '/api/v1/auth/signup',
];

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  const url = config.url ?? '';
  const isPublicPath = PUBLIC_PATHS.some((path) => url.includes(path));

  if (token && !isPublicPath) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = (error.config?.url ?? '').includes('/auth/');
    const hasToken = Boolean(localStorage.getItem('accessToken'));

    if (error.response?.status === 401 && hasToken && !isAuthRoute) {
      localStorage.removeItem('accessToken');
      window.location.replace('/auth/login');
    }

    return Promise.reject(error);
  },
);
