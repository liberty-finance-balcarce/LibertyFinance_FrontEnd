import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const {isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>; ///crear spinner
  }

  if (!isAuthenticated){
    return <Navigate to='/' replace/>
  }
    
  if (isAuthenticated) {
    return <Outlet/>
  }

  
}
