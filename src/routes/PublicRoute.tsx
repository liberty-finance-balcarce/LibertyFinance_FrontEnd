import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return <Outlet />;
}