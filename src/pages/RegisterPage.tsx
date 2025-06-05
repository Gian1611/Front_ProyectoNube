import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = registerUser(form);
    if (res.success) {
      alert(res.message);
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registro</h2>
        <input 
            name="nombre" 
            placeholder="Nombre" 
            onChange={handleChange} 
            required />
        <input 
            name="apellido" 
            placeholder="Apellido" 
            onChange={handleChange} 
            required />
        <input 
            name="username" 
            placeholder="Usuario" 
            onChange={handleChange} 
            required />
        <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            onChange={handleChange} 
            required />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}