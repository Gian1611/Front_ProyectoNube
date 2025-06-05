import { User } from "../models/User";

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

export const registerUser = (user: Omit<User, "id">): { success: boolean; message: string } => {
  const exists = users.some(u => u.username === user.username);
  if (exists) return { success: false, message: "El nombre de usuario ya existe" };

  const newUser: User = { ...user, id: Date.now() };
  users.push(newUser);
  return { success: true, message: "Usuario registrado con éxito" };
};

export const loginUser = (username: string, password: string): User | null => {
  return users.find(u => u.username === username && u.password === password) || null;
};