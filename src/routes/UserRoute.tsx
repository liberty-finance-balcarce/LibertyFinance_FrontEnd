import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function UserRoute() {
    const { isAuthenticated, role, loading } = useAuth();
    
    if (loading) {
        return <p>Cargando...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (role === "admin") {
        return <Navigate to="/admin" replace /> 
    }

    return <Outlet />
}