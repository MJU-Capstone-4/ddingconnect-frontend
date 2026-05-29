import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not defined. Check your .env file.');
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
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
