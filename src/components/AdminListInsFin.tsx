import { useEffect, useState } from "react";
import { FaPen, FaRegTrashAlt, FaPlus } from "react-icons/fa";

import { getInstrumentos } from "../services/api";
import { deleteInstrumentos } from "../services/api";
import { updateInstrumento } from "../services/api";
import { crearInstrumento } from "../services/api";

import type { Instrumento } from "../types/instrumento-financiero";
import type { UpdateInstrumentoDTO } from "../types/Dto/InstrumentoFinancieroDTO";
import type { createInstrumentoFinancieroDTO } from "../types/Dto/createInstumentoFinancieroDTO";

import { ModalCrearInstrumento } from "./ModalCrearInstrumento";
import { ModalEditarInstrumento } from "../components/ModalEditarInstFin";
import { ModalEliminarInstFin } from "./ModalEliminarInstFin";

import styles from "../styles/components/AdminListInsFin.module.css";

type Props = {
  instrumentos: Instrumento[];
};

export function AdminListInstFin({ instrumentos }: Props) {
  const [instrumentosState, setInstrumentosState] = useState<Instrumento[]>([]);
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
  
  const [instrumentoAEliminar, setInstrumentoAEliminar] = useState<Instrumento | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);

  useEffect(() => {
    if (instrumentos) {
      setInstrumentosState(instrumentos);
    }
  }, [instrumentos]);

  const editarInstrumento = (instrumento: Instrumento) => {
    setInstrumentoSeleccionado(instrumento);
    setModalEditarAbierto(true);
  };

  const guardarCambios = async (data: UpdateInstrumentoDTO) => {
    if (!instrumentoSeleccionado) return;

    try {
      await updateInstrumento(instrumentoSeleccionado.id_instrumento, data);

      setInstrumentosState((instrumentosActuales) =>
        instrumentosActuales.map((ins) =>
          ins.id_instrumento === instrumentoSeleccionado.id_instrumento
            ? { ...ins, ...data }
            : ins,
        ),
      );

      setModalEditarAbierto(false);
      setInstrumentoSeleccionado(null);

      const nuevosInstrumentos = await getInstrumentos();
      setInstrumentosState(nuevosInstrumentos);
    } catch (error) {
      console.error("Error al guardar los cambios", error)
      setModalEditarAbierto(false);
      setInstrumentoSeleccionado(null);
    }
  };

  const abrirEliminar = (instrumento: Instrumento) => {
    setInstrumentoAEliminar(instrumento);
    setModalEliminarAbierto(true);
  };

  const confirmarEliminar = async () => {
    if (!instrumentoAEliminar) return;

    try {
      await deleteInstrumentos(instrumentoAEliminar.id_instrumento);

      setInstrumentosState((prev) =>
        prev.filter(
          (ins) => ins.id_instrumento !== instrumentoAEliminar.id_instrumento,
        ),
      );

      setModalEliminarAbierto(false);
      setInstrumentoAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar el instrumento", error)
    }
  };

  const handleGuardarNuevo = async (data: createInstrumentoFinancieroDTO) => {
   try {
    await crearInstrumento(data);
    
    setModalCrearAbierto(false);

    const nuevosInstrumentos = await getInstrumentos();
    setInstrumentosState(nuevosInstrumentos);

  } catch (error) {
    console.error("Error crear el instrumento", error);
    setModalCrearAbierto(false);
  }
  };

  return (
    <>
      <div className={styles.list}>
        {instrumentosState.map((inst) => (
          <div key={inst.id_instrumento} className={styles.item}>
            <div className={styles.avatar}>
              <img
                className={styles.img}
                src={
                  (inst as any).logo_url ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
                }
                alt={inst.nombre_instrumento}
              />
            </div>

            <div className={styles.userInfo}>
              <h3>{inst.nombre_instrumento}</h3>
              <p>
                Rendimiento: <strong>{inst.rendimiento}%</strong> | Riesgo:{" "}
                <strong>{inst.riesgo}</strong>
              </p>
              <p>
                Precio: <strong>${inst.precio_instrumento}</strong> | Tipo:{" "}
                {inst.tipo_instrumento}
              </p>
            </div>

            <button
              type="button"
              onClick={() => editarInstrumento(inst)}
              className={styles.icono}
            >
              <FaPen />
            </button>
            <button
              type="button"
              onClick={() => abrirEliminar(inst)}
              className={styles.icono}
            >
              <FaRegTrashAlt />
            </button>

            <button
              type="button"
              onClick={() => setModalCrearAbierto(true)}
              className={styles.icono}
            >
              <FaPlus />
            </button>
          </div>
        ))}
      </div>

      {modalEditarAbierto && instrumentoSeleccionado && (
        <ModalEditarInstrumento
          instrumento={instrumentoSeleccionado}
          onClose={() => {
            setModalEditarAbierto(false);
            setInstrumentoSeleccionado(null);
          }}
          onSave={guardarCambios}
        />
      )}

      <ModalEliminarInstFin
        abierto={modalEliminarAbierto}
        instrumento={instrumentoAEliminar}
        onConfirmar={confirmarEliminar}
        onClose={() => {
          setModalEliminarAbierto(false);
          setInstrumentoAEliminar(null);
        }}
      />

      <ModalCrearInstrumento
        abierto={modalCrearAbierto}
        onClose={() => setModalCrearAbierto(false)}
        onSave={handleGuardarNuevo}
      />
    </>
  );
}
