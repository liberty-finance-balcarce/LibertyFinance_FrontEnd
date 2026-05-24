
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) return <Outlet />

  if (role === "user") return <Navigate to="/dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
}