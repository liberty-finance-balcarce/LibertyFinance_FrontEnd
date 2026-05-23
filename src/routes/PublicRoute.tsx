import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (isAuthenticated && role === "user") {
    return <Navigate to="/dashboard" />;
  }

  if (isAuthenticated && role === "admin") {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}
