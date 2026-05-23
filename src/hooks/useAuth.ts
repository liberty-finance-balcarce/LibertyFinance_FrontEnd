import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider y este componente no está dentro del provider",
    );
  return context;
}
