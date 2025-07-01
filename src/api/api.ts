import axios from 'axios';

const token = localStorage.getItem('token'); // o donde guardes tu JWT

export const localApi = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    authorization: `Bearer ${token}`
  }
});
/*
localApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/
