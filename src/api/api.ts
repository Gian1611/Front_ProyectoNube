import axios from 'axios';

export const localApi = axios.create({
  baseURL: `http://localhost:8080/api`,
});
