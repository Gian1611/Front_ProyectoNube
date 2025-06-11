import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ModalNuevaTarea from "../components/ModalNuevaTarea";
import TareaCard from "../components/TareaCard";
import { addTarea, getTareas, updateTareaState } from "../services/tareaService";
import { Tarea } from "../models/Tarea";
import "../pages/styles/ModalNuevaTarea.css"
import "./TableroPage.css";

export default function BoardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [listaTareas, setListaTareas] = useState<Tarea[]>(getTareas());

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setListaTareas(getTareas());
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("user");
  logout();
  navigate("/login");
  };

  const handleAddTarea = (tarea: Omit<Tarea, "id">) => {
    addTarea(tarea);
    setListaTareas(getTareas());
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("tareaId", id.toString());
  };

  const handleDrop = (e: React.DragEvent, estado: Tarea["estado"]) => {
    const id = parseInt(e.dataTransfer.getData("tareaId"), 10);
    updateTareaState(id, estado);
    setListaTareas(getTareas());
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="board-page">
      <header className="board-header">
        <div className="logo">☁️ Nube de tareas</div>
        <div className="profile-area">
          <div className="avatar" 
            onClick={() => setShowMenu(!showMenu)}
          >
            {user?.nombre?.charAt(0).toUpperCase()}
          </div>
          {showMenu && (
            <div className="profile-menu">
            <p className="profile-label">CUENTA</p>
            <div className="profile-info">
              <div className="avatar big">
                {user?.nombre?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="profile-name">
                {user?.nombre} {user?.apellido}
                </p>
                <p className="profile-email">{user?.role}</p> {/* Puedes usar rol si no hay email */}
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
          )}
        </div>
      </header>

      <div className="board-container">
        <h1 className="board-title">Hola, {user?.nombre}! 👋</h1>
        <div className="board-header-controls">
          <button className="add-task-btn" onClick={() => setModalAbierto(true)}>
          + Agregar Tarea
          </button>
        </div>

          {modalAbierto && (
            <ModalNuevaTarea
              onClose={() => setModalAbierto(false)}
              onAdd={handleAddTarea}
            />
          )}

        <div className="kanban-board">
        <div className="kanban-column" 
          onDragOver={handleDragOver} 
          onDrop={(e) => handleDrop(e, "pendiente")}>
          <h2>Pendiente</h2>
          {/* Aquí irán las tareas pendientes */}
          {listaTareas
            .filter((t) => t.estado === "pendiente")
            .map((t) => (
              <TareaCard key={t.id} tarea={t} onDragStart={handleDragStart} />
            ))}
        </div>

        <div className="kanban-column"
          onDragOver={handleDragOver} 
          onDrop={(e) => handleDrop(e, "en progreso")}>
          <h2>En progreso</h2>
          {/* Aquí irán las tareas en progreso */}
          {listaTareas
            .filter((t) => t.estado === "en progreso")
            .map((t) => (
              <TareaCard key={t.id} tarea={t} onDragStart={handleDragStart} />
            ))}
        </div>

        <div className="kanban-column"
          onDragOver={handleDragOver} 
          onDrop={(e) => handleDrop(e, "completado")}>
          <h2>Completadas</h2>
          {/* Aquí irán las tareas completadas */}
          {listaTareas
            .filter((t) => t.estado === "completado")
            .map((t) => (
              <TareaCard key={t.id} tarea={t} onDragStart={handleDragStart} />
            ))}
        </div>

        </div>
      </div>
    </div>
  );
  
}
