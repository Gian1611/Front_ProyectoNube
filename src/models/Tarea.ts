export interface Tarea {
  id: number;
  titulo: string;
  descrip: string;
  prioridad: "alta" | "media" | "baja";
  estado: "pendiente" | "en progreso" | "completado";
}