import { useState, useEffect } from "react";
import { fetchProvincias, type Provincia } from "../services/provincias";

export function useProvincias() {
  const [provinciasList, setProvinciasList] = useState<Provincia[]>([]);
  const [isLoadingProvincias, setIsLoadingProvincias] = useState<boolean>(true);
  const [errorProvincias, setErrorProvincias] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadProvincias = async () => {
      try {
        setIsLoadingProvincias(true);
        const response = await fetchProvincias();
        
        if (mounted) {
          setProvinciasList(response.data);
          setErrorProvincias(null);
        }
      } catch (err: any) {
        if (mounted) {
          console.error("Error de red al intentar cargar las provincias:", err);
          setErrorProvincias(err.message || "Error al cargar provincias");
        }
      } finally {
        if (mounted) {
          setIsLoadingProvincias(false);
        }
      }
    };

    loadProvincias();

    return () => {
      mounted = false;
    };
  }, []);

  return { provinciasList, isLoadingProvincias, errorProvincias };
}