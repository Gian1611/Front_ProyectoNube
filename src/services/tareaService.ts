import { Tarea } from "../models/Tarea";

let tareas: Tarea[] = [];
let nextId = 1;

export const getTareas = (): Tarea[] => tareas;

export const addTarea = (tarea: Omit<Tarea, 'id'>): void => {
  tareas.push({ ...tarea, id: nextId++, estado: "pendiente" });
};

export const updateTareaState = (tareaId: number, estado: Tarea["estado"]): void => {
  tareas = tareas.map((tarea) =>
    tarea.id === tareaId ? { ...tarea, estado } : tarea
  );
};

export const getPrioridadColor = (prioridad: Tarea["prioridad"]): string => {
  switch (prioridad) {
    case "alta":
      return "#f87171";// rojo
    case "media":
      return "#facc15";// amarillo
    case "baja":
      return "#34d399";// verde
    default:
      return "#e5e7eb";// gris
  }
};