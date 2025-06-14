import { User } from "../models/User";
import { localApi } from "../api/api";

// Usuarios prueba
let users: User[] = [
  {
    id: 1,
    username: "juan123",
    password: "123456",
    nombre: "Juan",
    apellido: "Pérez"
  },
  {
    id: 2,
    username: "maria456",
    password: "654321",
    nombre: "María",
    apellido: "García"
  },
  {
    id: 3,
    username: "carlos789",
    password: "abc123",
    nombre: "Carlos",
    apellido: "Ramírez"
  }
];

/*export const registerUser = (user: Omit<User, "id">): { success: boolean; message: string } => {
  const exists = users.some(u => u.username === user.username);
  if (exists) return { success: false, message: "El nombre de usuario ya existe" };

  const newUser: User = { ...user, id: Date.now() };
  users.push(newUser);
  return { success: true, message: "Usuario registrado con éxito" };
};
*/

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

//export const loginUser = (username: string, password: string): User | null => {
//  return users.find(u => u.username === username && u.password === password) || null;
//};

export const loginUser = async (username: string, password: string): Promise<{ token: string}> => {
  //const response = await axios.post(`/auth/login`, { username, password });
  //return response.data;
  try {
    const response = await localApi.post(`/auth/login`, { username, password });
    console.log(response.data)
    return response.data; // solo { token }
  } catch (error: any) {
    // Propaga el mensaje del backend al componente que use loginUser
    const message = error.response?.data?.message || "Error de conexión con el servidor";
    throw new Error(message);
  }
};

