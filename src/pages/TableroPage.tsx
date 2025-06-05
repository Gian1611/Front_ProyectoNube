import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./TableroPage.css";

export default function BoardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
  };

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
                <p className="profile-email">usuario@ejemplo.com</p> {/* Puedes usar username si no hay email */}
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
        <div className="kanban-board">
        <div className="kanban-column">
          <h2>Pendiente</h2>
          {/* Aquí irán las tareas pendientes */}
        </div>
        <div className="kanban-column">
          <h2>En progreso</h2>
          {/* Aquí irán las tareas en progreso */}
        </div>
        <div className="kanban-column">
          <h2>Completadas</h2>
          {/* Aquí irán las tareas completadas */}
        </div>
        </div>
      </div>
    </div>
  );
}