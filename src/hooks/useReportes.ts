import { useState, useEffect } from "react";
import { fetchReporteResumen } from "../services/reportes";
import { type ResumenByInstrumento } from "../types/reportes";

export function useReportes(token: string) {
  const [resumenReporte, setResumenReporte] = useState<ResumenByInstrumento[]>(
    [],
  );
  const [isLoadingResumen, setIsLoadingResumen] = useState<boolean>(true);
  const [errorResumen, setErrorResumen] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadResumen = async () => {
      try {
        setIsLoadingResumen(true);
        const response = await fetchReporteResumen(token);

        if (mounted) {
          setResumenReporte(response);
          setErrorResumen(null);
        }
      } catch (err: any) {
        if (mounted) {
          console.error("Error de red al intentar cargar resumen:", err);
          setErrorResumen(err.message || "Error al cargar resumen");
        }
        if (err.message?.includes("fetch failed") || err.name === "TypeError") {
          setErrorResumen("Error en la conexión con el servidor.");
        } else {
          setErrorResumen(
            err.message || "Ocurrió un error al procesar el informe.",
          );
        }
      } finally {
        if (mounted) {
          setIsLoadingResumen(false);
        }
      }
    };

    loadResumen();

    return () => {
      mounted = false;
    };
  }, [token]);

  return { resumenReporte, isLoadingResumen, errorResumen };
}
