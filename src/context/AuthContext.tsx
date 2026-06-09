import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Usuario } from "../types/usuarios";

interface RegisterData {
  dni_usuario: number;
  nombre: string;
  apellido: string;
  mail: string;
  contraseña: string;
  numero_telefono: string;
  direccion: string;
  id_provincia: number;
  id_perfilinv: number;
  id_codigo_referidos: number;
  fecha_nacimiento: string;
}

interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  loading: boolean;
  role: string | null;
  login: (dni: number, password: string) => Promise<Response>;
  register: (data: RegisterData) => Promise<Response>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const time = 15 * 60 * 1000;
    const interval = setInterval(() => {
      refreshToken();
    }, time);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const loadAuth = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      const savedRole = localStorage.getItem("role");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      setToken(savedToken);

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setRole(savedRole ?? parsedUser.role ?? null);
        setLoading(false);
        return;
      }

      await getUserInfo(savedToken);
      setLoading(false);
    };

    loadAuth();
  }, []);

  const login = async (dni: number, password: string) => {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ dni_usuario: dni, contraseña: password }),
    });

    if (!response.ok) {
      console.error("Login fallido", response.statusText);
      return response;
    }

    const dataParsed = await response.json();
    const data = dataParsed.data || dataParsed;

    setToken(data.token);
    localStorage.setItem("token", data.token);

    await getUserInfo(data.token);

    return response;
  };

  const register = async (data: RegisterData) => {
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error en el registro", response.statusText);
      return response;
    }

    return response;
  };

  const refreshToken = async () => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/refresh-token",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) logout();

        return;
      }

      const dataParsed = await response.json();
      const data = dataParsed.data ?? dataParsed;

      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error al refrescar el token:", error);
    }
  };

  const getUserInfo = async (authToken?: string) => {
    const token = authToken ?? localStorage.getItem("token");

    if (!token) return;

    const response = await fetch("http://localhost:3000/api/v1/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Token invalido o expirado", response.statusText);
      logout();
      return response;
    }

    const dataParsed = await response.json();
    const data = dataParsed.data;

    setUser(data);
    setRole(data.rol.nombre);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.rol.nombre);

    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    loading,
    role,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
