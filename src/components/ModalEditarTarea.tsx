import { useState } from "react";
import { Tarea } from "../models/Tarea";

interface Props {
  tarea: Tarea;
  onClose: () => void;
  onUpdate: (tarea: Tarea) => void;
  onDelete: (id: number) => void;
}

export default function ModalEditarTarea({ tarea, onClose, onUpdate, onDelete }: Props) {
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescrip] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState<Tarea["prioridad"]>(tarea.prioridad);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...tarea, titulo, descripcion, prioridad });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescrip(e.target.value)}
          />
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value as Tarea["prioridad"])}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <div className="modal-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => onDelete(tarea.tarea_id)}>Eliminar tarea</button>
          </div>
          <button onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}