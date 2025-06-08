import React from "react";
import { Tarea } from "../models/Tarea";
import { getPrioridadColor } from "../services/tareaService";
import '../pages/styles/TareaCard.css';

interface Props {
  tarea: Tarea;
  onDragStart: (e: React.DragEvent, id: number) => void;
}

export default function TareaCard({ tarea, onDragStart }: Props) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, tarea.id)}
      style={{ borderLeft: `8px solid ${getPrioridadColor(tarea.prioridad)}` }}
    >
      <strong>{tarea.titulo}</strong>
      <p>{tarea.descrip}</p>
      <small>Prioridad: {tarea.prioridad}</small>
    </div>
  );
}