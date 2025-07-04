import { createContext, useContext, useEffect, useState } from "react";
import { UserApi } from "../models/UserApi";
import { loginUser } from "../services/authService";
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: UserApi | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserApi | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser: UserApi = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { token } = await loginUser(username, password);
    localStorage.setItem("token", token);

    const decodedUser: UserApi = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    setUser(decodedUser);
  };
  
   const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};