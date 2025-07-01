export interface Tarea {
  tarea_id: number;
  titulo: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  estado: "pendiente" | "en progreso" | "completada";
}