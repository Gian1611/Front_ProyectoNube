import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { addTarea, getTareas, updateTareaState, updateTarea,deleteTarea } from "../services/tareaService";
import { Tarea } from "../models/Tarea";
import "../pages/styles/ModalNuevaTarea.css"
import "./TableroPage.css";
import ModalNuevaTarea from "../components/ModalNuevaTarea";
import TareaCard from "../components/TareaCard";
import ModalEditarTarea from "../components/ModalEditarTarea";

export default function BoardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [listaTareas, setListaTareas] = useState<Tarea[]>([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      cargarTareas();
    }
  }, [user, navigate]);

  const cargarTareas = async () => {
    try {
      const tareas = await getTareas();
      setListaTareas(tareas);
    } catch (error) {
      console.error("Error al obtener tareas", error);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("user");
  logout();
  navigate("/login");
  };

  const handleAddTarea = async (tarea: { titulo: string; descripcion: string; prioridad: Tarea["prioridad"] }) => {
    try {
      await addTarea(tarea);
      await cargarTareas();
    } catch (error) {
      console.error("Error al agregar tarea", error);
    }
  };

  const handleUpdateTarea = async (tarea: Tarea) => {
    try {
      await updateTarea(tarea.tarea_id, {
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        prioridad: tarea.prioridad,
      });
      await cargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea", error);
    }
  };

  const handleDeleteTarea = async (id: number) => {
    try {
      await deleteTarea(id);
      await cargarTareas();
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    console.log("Arrastrando tarea con ID:", id);
    e.dataTransfer.setData("tarea_id", id.toString());
  };

  const handleDrop = async (e: React.DragEvent, estado: Tarea["estado"]) => {
    const id = parseInt(e.dataTransfer.getData("tarea_id"), 10);
    try {
      await updateTareaState(id, estado);
      await cargarTareas();
    } catch (error) {
      console.error("Error al actualizar estado", error);
    }
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
                <p className="profile-email">{user?.role}</p>
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

          {tareaSeleccionada && (
            <ModalEditarTarea
              tarea={tareaSeleccionada!}
              onClose={() => setTareaSeleccionada(null)}
              onUpdate={handleUpdateTarea}
              onDelete={handleDeleteTarea}
            />
          )}

        <div className="kanban-board">
          <div className="kanban-column" 
            onDragOver={handleDragOver} 
            onDrop={(e) => handleDrop(e, "pendiente")}>
            <h2>Pendiente</h2>
            {/* Aquí irán las tareas pendientes */}
            
            {/*listaTareas
              .filter((t) => t.estado === "pendiente")
              .map((t) => 
                (
                <TareaCard 
                  key={t.id} 
                  tarea={t} 
                  onDragStart={handleDragStart} 
                  onClick={(t) => setTareaSeleccionada(t)} 
                />
              ))*/}
            {listaTareas
              .filter((t) => t.estado === "pendiente")
              .map((t) => {
              console.log("Tarea en render:", t);
              return (
                <TareaCard 
                  key={t.tarea_id} 
                  tarea={t} 
                  onDragStart={handleDragStart} 
                  onClick={(t) => setTareaSeleccionada(t)} 
                />
              );
            })}
          </div>

          <div className="kanban-column"
            onDragOver={handleDragOver} 
            onDrop={(e) => handleDrop(e, "en progreso")}>
            <h2>En progreso</h2>
            {/* Aquí irán las tareas en progreso */}
            {listaTareas
              .filter((t) => t.estado === "en progreso")
              .map((t) => (
                <TareaCard 
                  key={t.tarea_id} 
                  tarea={t} 
                  onDragStart={handleDragStart} 
                  onClick={() => setTareaSeleccionada(t)} 
                />
              ))}
          </div>

          <div className="kanban-column"
            onDragOver={handleDragOver} 
            onDrop={(e) => handleDrop(e, "completada")}>
            <h2>Completadas</h2>
            {/* Aquí irán las tareas completadas */}
            {listaTareas
              .filter((t) => t.estado === "completada")
              .map((t) => (
                <TareaCard 
                  key={t.tarea_id} 
                  tarea={t} 
                  onDragStart={handleDragStart} 
                  onClick={() => setTareaSeleccionada(t)} 
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  
}
