import { Tarea } from "../models/Tarea";
import { localApi } from "../api/api";
/*
PROTOTIPO

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
*/

export const getTareas = async (): Promise<Tarea[]> => {
  const res = await localApi.get('/tasks');
  return res.data;
};

export const addTarea = async (tarea: Omit<Tarea, 'tarea_id' | 'estado'>): Promise<void> => {
  await localApi.post('/tasks', tarea);
};

export const updateTareaState = async (tarea_id: number, estado: Tarea["estado"]): Promise<void> => {
  await localApi.put(`/tasks/${tarea_id}/estado`, { estado });
};

export const updateTarea = async (
  tarea_id: number,
  data: Pick<Tarea, 'titulo' | 'descripcion' | 'prioridad'>
): Promise<void> => {
  await localApi.put(`/tasks/${tarea_id}`, data);
};

export const deleteTarea = async (tarea_id: number): Promise<void> => {
  await localApi.delete(`/tasks/${tarea_id}`);
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