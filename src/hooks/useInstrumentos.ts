import { useState, useEffect } from "react";
import { getInstrumentos, deleteInstrumentos, updateInstrumento, crearInstrumento } from "../services/api";

import type { Instrumento } from "../types/instrumento-financiero";
import type { UpdateInstrumentoDTO } from "../types/Dto/InstrumentoFinancieroDTO";
import type { createInstrumentoFinancieroDTO } from "../types/Dto/createInstumentoFinancieroDTO";

export function useInstrumentos() {
  const [instrumentosState, setInstrumentosState] = useState<Instrumento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial de todos los instrumentos
  const cargarInstrumentos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await getInstrumentos();
      setInstrumentosState(data || []);
    } catch (err: any) {
      console.error("Error al cargar los instrumentos financieros:", err);
      setError(err.message || "Error al obtener los instrumentos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarInstrumentos();
  }, []);

  // Guardar un nuevo instrumento
  const handleCrearInstrumento = async (data: createInstrumentoFinancieroDTO) => {
    try {
      await crearInstrumento(data);
      const nuevos = await getInstrumentos();
      setInstrumentosState(nuevos);
    } catch (err) {
      console.error("Error al crear el instrumento:", err);
      throw err;
    }
  };

  // Guardar cambios de uno existente
  const handleEditarInstrumento = async (id: number, data: UpdateInstrumentoDTO) => {
    try {
      await updateInstrumento(id, data);
      setInstrumentosState((actuales) =>
        actuales.map((ins) => (ins.id_instrumento === id ? { ...ins, ...data } : ins))
      );
      const nuevos = await getInstrumentos();
      setInstrumentosState(nuevos);
    } catch (err) {
      console.error("Error al actualizar el instrumento:", err);
      throw err;
    }
  };

  // Eliminar un instrumento
  const handleEliminarInstrumento = async (id: number) => {
    try {
      await deleteInstrumentos(id);
      setInstrumentosState((prev) => prev.filter((ins) => ins.id_instrumento !== id));
    } catch (err) {
      console.error("Error al eliminar el instrumento:", err);
      throw err;
    }
  };

  return {
    instrumentosState,
    cargando,
    error,
    handleCrearInstrumento,
    handleEditarInstrumento,
    handleEliminarInstrumento,
  };
}