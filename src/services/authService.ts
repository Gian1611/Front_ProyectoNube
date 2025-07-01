import { localApi } from "../api/api";

export const registerUser = async(
  nombre: string,
  apellido: string, 
  username: string,
  password: string): Promise<{ message: string}> => {
      try {
      const inputData = {
        "nombre": nombre,
        "apellido": apellido,
        "username": username,
        "password": password,
      };
      const response = await localApi.post('/auth/register', inputData);
      return response.data.message; // Devuelve el mensaje de respuesta del backend
    } catch (error: any) {
      console.log('Error1', error.message);
      console.log('Error2', error.error);
      throw new Error(
        error.response?.data?.message || 'Error al registrar usuario en iplm'
      );
    }
};

export const loginUser = async (username: string, password: string): Promise<{ token: string}> => {
  try {
    const response = await localApi.post(`/auth/login`, { username, password });
    return response.data; // solo { token }
  } catch (error: any) {
    // Devuelve el mensaje del backend
    const message = error.response?.data?.message || "Error de conexión con el servidor";
    throw new Error(message);
  }
};

