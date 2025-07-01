import React, { useState } from "react";
import { Tarea } from "../models/Tarea";

interface Props {
  onClose: () => void;
  //onAdd: (tarea: Omit<Tarea, "id">) => void;
  onAdd: (tarea: { titulo: string; descripcion: string; prioridad: Tarea["prioridad"] }) => Promise<void>;
}

export default function ModalNuevaTarea({ onClose, onAdd }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescrip] = useState("");
  const [prioridad, setPrioridad] = useState<Tarea["prioridad"]>("media");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    try {
      await onAdd({ titulo, descripcion, prioridad });
      onClose();
    } catch (err) {
      alert("Error al agregar tarea");
    }
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
            value={descripcion}
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