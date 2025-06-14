import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css"

export default function RegisterPage() {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: ""
  });

  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    setApellido(e.target.value);
    setUsername(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const response =  await registerUser (nombre, apellido, username, password);
    navigate("/login");
  } catch (err: any) {
    alert(err.message);
  }
   /* const res = registerUser(form);
    if (res.success) {
      alert(res.message);
      navigate("/login");
    } else {
      alert(res.message);
    }*/
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registro</h2>
        <input 
            name="nombre" 
            placeholder="Nombre" 
            onChange={(e) => setNombre(e.target.value)}
            required />
        <input 
            name="apellido" 
            placeholder="Apellido" 
            onChange={(e) => setApellido(e.target.value)}
            required />
        <input 
            name="username" 
            placeholder="Usuario" 
            onChange={(e) => setUsername(e.target.value)}
            required />
        <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            onChange={(e) => setPassword(e.target.value)}
            required />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}