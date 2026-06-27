import { useState } from "react";
import { FaPen, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { useInstrumentos } from "../hooks/useInstrumentos";

import type { Instrumento } from "../types/instrumento-financiero";

import { ModalCrearInstrumento } from "./ModalCrearInstrumento";
import { ModalEditarInstrumento } from "../components/ModalEditarInstFin";
import { ModalEliminarInstFin } from "./ModalEliminarInstFin";

import styles from "../styles/components/AdminListInsFin.module.css";

export function AdminListInstFin() {
  const {
    instrumentosState,
    handleCrearInstrumento,
    handleEditarInstrumento,
    handleEliminarInstrumento,
  } = useInstrumentos();

  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
  const [instrumentoAEliminar, setInstrumentoAEliminar] = useState<Instrumento | null>(null);
  
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);


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
              onClick={() => {
                setInstrumentoSeleccionado(inst);
                setModalEditarAbierto(true);
              }}
              className={styles.icono}
            >
              <FaPen />
            </button>
            <button
              type="button"
              onClick={() => {
                setInstrumentoAEliminar(inst);
                setModalEliminarAbierto(true);
              }}
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
          onSave={(data) =>
            handleEditarInstrumento(instrumentoSeleccionado.id_instrumento, data)
              .then(() => {
                setModalEditarAbierto(false);
                setInstrumentoSeleccionado(null);
              })
              .catch(() => setModalEditarAbierto(false))
          }
        />
      )} 

      <ModalEliminarInstFin
        abierto={modalEliminarAbierto}
        instrumento={instrumentoAEliminar}
        onConfirmar={() =>
          instrumentoAEliminar &&
          handleEliminarInstrumento(instrumentoAEliminar.id_instrumento)
            .then(() => {
              setModalEliminarAbierto(false);
              setInstrumentoAEliminar(null);
            })
        }
        onClose={() => {
          setModalEliminarAbierto(false);
          setInstrumentoAEliminar(null);
        }}
      />

      <ModalCrearInstrumento
        abierto={modalCrearAbierto}
        onClose={() => setModalCrearAbierto(false)}
        onSave={(data) =>
          handleCrearInstrumento(data)
            .then(() => setModalCrearAbierto(false))
            .catch(() => setModalCrearAbierto(false))
        }
      />
    </>
  );
}