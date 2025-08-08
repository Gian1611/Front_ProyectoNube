import axios from 'axios';

const token = localStorage.getItem('token');

export const localApi = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    authorization: `Bearer ${token}`
  }
});

// Interceptor para añadir el token en *cada* petición
localApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
