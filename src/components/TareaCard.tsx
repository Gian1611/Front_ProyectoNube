import React from "react";
import { Tarea } from "../models/Tarea";
import { getPrioridadColor } from "../services/tareaService";
import '../pages/styles/TareaCard.css';

interface Props {
  tarea: Tarea;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onClick: (tarea: Tarea) => void;
}

export default function TareaCard({ tarea, onDragStart, onClick }: Props) {
  return (
    <div
      className="task-card"
      draggable
      onClick={() => onClick(tarea)}
      onDragStart={(e) => onDragStart(e, tarea.tarea_id)}
      style={{ 
        borderLeft: `8px solid ${getPrioridadColor(tarea.prioridad)}`,
        cursor: 'pointer'
      }}
    >
      <strong>{tarea.titulo}</strong>
      <p>{tarea.descripcion}</p>
      <small>Prioridad: {tarea.prioridad}</small>
    </div>
  );
}