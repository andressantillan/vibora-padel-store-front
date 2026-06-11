import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export interface ApiError {
  status: number | null;
  message: string;
  errors?: Record<string, string[]>;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const normalized: ApiError = {
      status: error.response?.status ?? null,
      message:
        error.response?.data?.message ??
        (error.code === 'ERR_NETWORK'
          ? 'No se pudo conectar con el servidor.'
          : 'Ocurrió un error inesperado.'),
      errors: error.response?.data?.errors,
    };
    return Promise.reject(normalized);
  }
);

export default api;