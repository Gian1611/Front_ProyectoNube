import React, { useState } from "react";
import { Tarea } from "../models/Tarea";

interface Props {
  onClose: () => void;
  onAdd: (tarea: Omit<Tarea, "id">) => void;
}

export default function ModalNuevaTarea({ onClose, onAdd }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descrip, setDescrip] = useState("");
  const [prioridad, setPrioridad] = useState<Tarea["prioridad"]>("media");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onAdd({ titulo, descrip, prioridad, estado: "pendiente" });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agregar nueva tarea</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            value={descrip}
            onChange={(e) => setDescrip(e.target.value)}
          />
          <select
            value={prioridad}
            onChange={(e) =>
              setPrioridad(e.target.value as Tarea["prioridad"])
            }
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}