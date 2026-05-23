import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AdminRoute() {
    const { isAuthenticated, role, loading } = useAuth();
    
    if (loading) {
        return <p>Cargando...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (role === "user") {
        return <Navigate to="/dashboard" replace /> 
    }

    return <Outlet />
}